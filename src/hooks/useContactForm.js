import { useState } from "react";
import {init , send } from "emailjs-com";

init(process.env.REACT_APP_EMAILJS_USER_ID);

const useContactForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isSent, setIsSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            try {
                console.log("Attempting to send email with data:", {
                    service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
                    template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                    user_id: process.env.REACT_APP_EMAILJS_USER_ID,
                    template_params: {
                        to_name: "Admin",
                        from_name: formData.name,
                        reply_to: formData.email,
                        message: formData.message,
                    }
                });

                const response = await send(
                    process.env.REACT_APP_EMAILJS_SERVICE_ID,
                    process.env.REACT_APP_EMAILJS_TEMPLATE_ID ,
                    {
                        to_name: "Admin",
                        from_name: formData.name,
                        reply_to: formData.email,
                        message: formData.message,
                    },
                   process.env.REACT_APP_EMAILJS_USER_ID
                );

                console.log("Email send response:", response);

                if (response.status === 200) {
                    setIsSent(true);
                    setFormData({ name: "", email: "", message: "" });
                    setTimeout(() => setIsSent(false), 5000);
                }
            } catch (error) {
                console.error("Detailed error when sending email:", {
                    error: error,
                    message: error.message,
                    text: error.text,
                });
                setErrors({
                    submit: `Failed to send message: ${error.message || 'Unknown error'}`
                });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return {
        formData,
        errors,
        isSent,
        isSubmitting,
        handleChange,
        handleSubmit
    };
}

export default useContactForm;