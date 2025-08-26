import Image from "next/image";
import logo from "@/assets/img/comingsoon/CosmasLogo.svg"

import Marquee from "react-fast-marquee";

import { useEffect, useState, useRef } from "react"

const ComingSoon = () => {

    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(true); // 👈 NUEVO
    const timerRef = useRef(null);                  // 👈 NUEVO

    const [formData, setFormData] = useState({
        Email: "",
        Phone: ""
    });

    // Controla mensajes y visibilidad del form
    useEffect(() => {
        // Limpieza de timeouts previos
        if (timerRef.current) clearTimeout(timerRef.current);

        if (enviado && !error) {
            // Éxito: ocultar form y re-mostrar a los 5s
            setShowForm(false);
            timerRef.current = setTimeout(() => {
                setEnviado(false);
                setShowForm(true);
            }, 5000);
        } else if (error) {
            // Error: mantener form visible, ocultar mensaje a los 5s
            setShowForm(true);
            timerRef.current = setTimeout(() => {
                setError(null);
            }, 5000);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [enviado, error]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataEl = new FormData(event.target);
        try {
            await fetch("/__forms.html", {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formDataEl).toString()
            });
            setEnviado(true);
            setError(null);
            // Limpiar campos
            setFormData({ Email: "", Phone: "" });
        } catch (err) {
            setError("Ocurrió un error al enviar el formulario. Inténtalo nuevamente más tarde.");
            setEnviado(false);
        }
    };

    return (
        <div className="coming-soon-wrapper">
            <Marquee autoFill speed={150}>
                <Image src={logo} alt="COSMAS" />
            </Marquee>

            <div className="content-wrapper">
                <p>En construcción, pero podemos seguir en conversación.</p>

                <div className="form-wrapper">
                    {showForm && (
                        <form
                            className="form-area"
                            name="Get In Touch"
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="bot-field" />
                            <input type="hidden" name="form-name" value="Get In Touch" />

                            <input required className="email" type="email" placeholder="Email" name="Email" value={formData.Email} onChange={handleChange} />
                            <input required className="phone" type="tel" placeholder="Teléfono" name="Phone" value={formData.Phone} onChange={handleChange} />

                            <button type="submit">
                                Enviar
                            </button>

                        </form>
                    )}
                    
                    {/* Mensajes FUERA del form para que se muestren aunque se oculte */}
                    {error && (
                        <p className="message-form" style={{ color: '#ff6a6a', marginTop: '20px' }}>
                            {error}
                        </p>
                    )}
                    {enviado && !error && (
                        <p className="message-form" style={{ color: 'black', marginTop: '20px' }}>
                            ¡Gracias! Nos pondremos en contacto contigo pronto.
                        </p>
                    )}
                </div>

            </div>
        </div>

    );
};

export default ComingSoon;