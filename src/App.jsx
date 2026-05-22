import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock,
  Gift,
  Heart,
  MapPin,
  Music,
  Navigation,
  Send,
  Sparkles,
  Utensils,
} from "lucide-react";

const wedding = {
  bride: "Gevorg",
  groom: "Lusine",
  date: "16.09.2026",
  month: "September",
  year: "2026",
  day: 16,
  ceremonyTime: "15:00",
  venue: "White Garden Hall",
  address: "Yerevan, Armenia",
  rsvpDeadline: "до 1 сентября 2026",
  maps: "https://maps.google.com",
};

const photos = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=92",
  "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1800&q=92",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=92",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1800&q=92",
  "https://images.unsplash.com/photo-1509610973147-232dfea52a97?auto=format&fit=crop&w=1800&q=92",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const september2026 = [
  "", "", 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, "", "", "",
];

const program = [
  { time: "15:00", title: "Церемония", text: "Торжественная регистрация и первые семейные фотографии.", icon: Heart },
  { time: "16:00", title: "Welcome", text: "Встреча гостей, напитки и лёгкое общение.", icon: Sparkles },
  { time: "18:00", title: "Банкет", text: "Праздничный ужин, тосты и уютная атмосфера.", icon: Utensils },
  { time: "20:00", title: "Танцы", text: "Музыка, веселье и красивое завершение вечера.", icon: Music },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.75, ease: "easeOut" },
};

function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after {
        box-sizing: border-box;
      }

      html,
      body,
      #root {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        min-width: 100% !important;
        min-height: 100% !important;
        overflow-x: hidden !important;
        background: #11100f !important;
      }

      body {
        font-family: Arial, Helvetica, sans-serif !important;
        color: #ffffff !important;
        -webkit-font-smoothing: antialiased;
        text-rendering: geometricPrecision;
        color-scheme: only light;
      }

      a {
        text-decoration: none;
      }

      button,
      input,
      select,
      textarea {
        font-family: Arial, Helvetica, sans-serif !important;
      }

      .app {
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
        background: #11100f;
        color: #ffffff;
      }

      .section {
        position: relative;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;
        padding: 40px 20px;
        background: #11100f;
      }

      .section-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        animation: photoZoom 18s ease-in-out infinite alternate;
        transform-origin: center;
      }

      .section-overlay {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.62) 100%),
          linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0.38), rgba(0,0,0,0.66));
      }

      .section-content {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 430px;
        min-height: calc(100vh - 80px);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .center {
        text-align: center;
      }

      .label {
        margin: 0 0 26px;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 8px;
        text-transform: uppercase;
        opacity: 0.88;
        text-shadow: 0 2px 16px rgba(0,0,0,0.85);
      }

      .title {
        margin: 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: clamp(62px, 11vw, 96px);
        line-height: 0.9;
        font-weight: 700;
        text-shadow: 0 4px 30px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1);
      }

      .ampersand {
        display: block;
        margin: 13px 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: clamp(42px, 8vw, 58px);
        font-style: italic;
        line-height: 0.9;
      }

      .divider {
        width: 92px;
        height: 1px;
        margin: 34px auto;
        background: rgba(255,255,255,0.72);
      }

      .date {
        margin: 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-size: 26px;
        font-weight: 900;
        letter-spacing: 9px;
        text-shadow: 0 3px 22px rgba(0,0,0,0.9);
      }

      .hero-text {
        max-width: 330px;
        margin: 18px auto 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-size: 15px;
        line-height: 1.8;
        font-weight: 800;
        text-shadow: 0 3px 22px rgba(0,0,0,0.9);
      }

      .down-button {
        width: 48px;
        height: 48px;
        margin: 56px auto 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.45);
        background: rgba(255,255,255,0.14);
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        backdrop-filter: blur(12px);
      }

      .glass-card {
        border-radius: 32px;
        border: 1px solid rgba(255,255,255,0.28);
        background: rgba(0,0,0,0.42);
        padding: 26px;
        box-shadow: 0 24px 70px rgba(0,0,0,0.32);
        backdrop-filter: blur(22px);
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
      }

      .section-title {
        margin: 0 0 28px;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: 54px;
        line-height: 0.95;
        font-weight: 700;
        text-align: center;
        text-shadow: 0 4px 30px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1);
      }

      .calendar-title {
        margin: 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: 54px;
        line-height: 1;
        font-weight: 700;
        font-style: italic;
      }

      .calendar-year {
        margin: 7px 0 0;
        color: rgba(255,255,255,0.82) !important;
        -webkit-text-fill-color: rgba(255,255,255,0.82) !important;
        font-size: 17px;
        font-weight: 800;
        letter-spacing: 8px;
      }

      .week-grid,
      .days-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        text-align: center;
      }

      .week-grid {
        margin-top: 30px;
        color: rgba(255,255,255,0.65) !important;
        -webkit-text-fill-color: rgba(255,255,255,0.65) !important;
        font-size: 12px;
        font-weight: 800;
      }

      .days-grid {
        margin-top: 12px;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-size: 14px;
        font-weight: 800;
      }

      .day-cell {
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
      }

      .day-empty {
        color: transparent !important;
        -webkit-text-fill-color: transparent !important;
      }

      .day-active {
        background: #ffffff;
        color: #11100f !important;
        -webkit-text-fill-color: #11100f !important;
        box-shadow: 0 8px 22px rgba(255,255,255,0.28);
      }

      .info-grid {
        margin-top: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .info-box {
        border-radius: 24px;
        border: 1px solid rgba(255,255,255,0.16);
        background: rgba(255,255,255,0.14);
        padding: 17px 12px;
        text-align: center;
      }

      .info-small {
        margin: 8px 0 3px;
        color: rgba(255,255,255,0.76) !important;
        -webkit-text-fill-color: rgba(255,255,255,0.76) !important;
        font-size: 13px;
        font-weight: 800;
      }

      .info-main {
        margin: 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-size: 15px;
        font-weight: 900;
      }

      .program-list {
        display: grid;
        gap: 16px;
      }

      .program-card,
      .detail-card {
        border-radius: 27px;
        border: 1px solid rgba(255,255,255,0.24);
        background: rgba(0,0,0,0.44);
        padding: 20px;
        box-shadow: 0 18px 50px rgba(0,0,0,0.22);
        backdrop-filter: blur(22px);
      }

      .row {
        display: flex;
        align-items: flex-start;
        gap: 16px;
      }

      .icon-circle {
        width: 48px;
        height: 48px;
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #ffffff;
        color: #11100f !important;
        -webkit-text-fill-color: #11100f !important;
        box-shadow: 0 12px 28px rgba(0,0,0,0.22);
      }

      .program-time {
        margin: 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: 30px;
        line-height: 1;
        font-weight: 700;
      }

      .card-title {
        margin: 6px 0 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-size: 21px;
        line-height: 1.15;
        font-weight: 900;
      }

      .card-text {
        margin: 9px 0 0;
        color: rgba(255,255,255,0.82) !important;
        -webkit-text-fill-color: rgba(255,255,255,0.82) !important;
        font-size: 14px;
        line-height: 1.65;
        font-weight: 700;
      }

      .location-title {
        margin: 0;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: 46px;
        line-height: 1.05;
        font-weight: 700;
      }

      .location-address {
        max-width: 300px;
        margin: 18px auto 0;
        color: rgba(255,255,255,0.84) !important;
        -webkit-text-fill-color: rgba(255,255,255,0.84) !important;
        font-size: 16px;
        line-height: 1.7;
        font-weight: 800;
      }

      .route-button {
        margin-top: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        min-width: 210px;
        min-height: 52px;
        border-radius: 999px;
        background: #ffffff !important;
        color: #11100f !important;
        -webkit-text-fill-color: #11100f !important;
        font-size: 14px;
        font-weight: 900;
        box-shadow: 0 18px 42px rgba(0,0,0,0.28);
      }

      .detail-list {
        display: grid;
        gap: 16px;
      }

      .detail-icon {
        width: 26px;
        height: 26px;
        flex: 0 0 auto;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
      }

      .rsvp-section {
        position: relative;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;
        padding: 40px 20px;
        background: #f7f0e8;
        color: #15120f !important;
      }

      .rsvp-section::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at top left, rgba(242,170,160,0.35), transparent 32%),
          radial-gradient(circle at bottom right, rgba(195,154,96,0.24), transparent 34%);
      }

      .rsvp-content {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 430px;
        min-height: calc(100vh - 80px);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .rsvp-card {
        border-radius: 32px;
        border: 1px solid rgba(255,255,255,0.9);
        background: rgba(255,255,255,0.96);
        padding: 26px;
        box-shadow: 0 24px 70px rgba(120,105,91,0.24);
        color: #15120f !important;
      }

      .rsvp-label {
        margin: 0 0 12px;
        color: #e4576f !important;
        -webkit-text-fill-color: #e4576f !important;
        text-align: center;
        font-size: 13px;
        font-weight: 900;
        letter-spacing: 7px;
        text-transform: uppercase;
      }

      .rsvp-title {
        margin: 0;
        color: #15120f !important;
        -webkit-text-fill-color: #15120f !important;
        text-align: center;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: 52px;
        line-height: 1;
        font-weight: 700;
      }

      .rsvp-text {
        margin: 17px 0 0;
        color: rgba(21,18,15,0.72) !important;
        -webkit-text-fill-color: rgba(21,18,15,0.72) !important;
        text-align: center;
        font-size: 14px;
        line-height: 1.65;
        font-weight: 800;
      }

      .form {
        margin-top: 30px;
        display: grid;
        gap: 16px;
      }

      .form-field {
        width: 100%;
        min-height: 55px;
        border-radius: 18px;
        border: 1px solid rgba(120,113,108,0.26);
        background: #fbf7f2;
        padding: 16px 20px;
        color: #15120f !important;
        -webkit-text-fill-color: #15120f !important;
        font-size: 15px;
        font-weight: 900;
        outline: none;
      }

      .form-field::placeholder {
        color: #8b8279 !important;
        -webkit-text-fill-color: #8b8279 !important;
      }

      .submit-button {
        min-height: 56px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        border: 0;
        border-radius: 999px;
        background: #15120f !important;
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        font-size: 15px;
        font-weight: 900;
        cursor: pointer;
        box-shadow: 0 18px 38px rgba(0,0,0,0.22);
      }

      .success-box {
        margin-top: 30px;
        border-radius: 27px;
        background: #f7f0e8;
        padding: 26px;
        text-align: center;
        color: #15120f !important;
      }

      .success-title {
        margin: 0;
        color: #15120f !important;
        -webkit-text-fill-color: #15120f !important;
        font-family: Georgia, 'Times New Roman', serif !important;
        font-size: 34px;
        font-weight: 700;
      }

      .success-text {
        margin: 12px 0 0;
        color: rgba(21,18,15,0.72) !important;
        -webkit-text-fill-color: rgba(21,18,15,0.72) !important;
        font-size: 14px;
        line-height: 1.65;
        font-weight: 800;
      }

      .summary-box {
        margin-top: 18px;
        border-radius: 18px;
        background: #ffffff;
        padding: 16px;
        color: #15120f !important;
        -webkit-text-fill-color: #15120f !important;
        text-align: left;
        font-size: 14px;
        font-weight: 700;
      }

      @keyframes photoZoom {
        from { transform: scale(1); }
        to { transform: scale(1.055); }
      }

      @media (max-width: 640px) {
        .section,
        .rsvp-section {
          min-height: 100svh;
          padding: 34px 18px;
        }

        .section-content,
        .rsvp-content {
          min-height: calc(100svh - 68px);
          max-width: 390px;
        }

        .label {
          letter-spacing: 7px;
          font-size: 11px;
        }

        .title {
          font-size: 58px;
        }

        .date {
          font-size: 23px;
          letter-spacing: 8px;
        }

        .hero-text {
          font-size: 14px;
        }

        .section-title,
        .calendar-title,
        .rsvp-title {
          font-size: 46px;
        }

        .location-title {
          font-size: 38px;
        }
      }
    `}</style>
  );
}

function Section({ children, bg, id }) {
  return (
    <section id={id} className="section">
      {bg && <img src={bg} alt="Wedding background" className="section-bg" />}
      {bg && <div className="section-overlay" />}
      <div className="section-content">{children}</div>
    </section>
  );
}

function GlassCard({ children }) {
  return <div className="glass-card">{children}</div>;
}

export default function WeddingInvitation() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1 гость");
  const [attending, setAttending] = useState("Да, буду");
  const [sent, setSent] = useState(false);

  const mainPhoto = useMemo(() => photos[0], []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="app">
      <GlobalStyles />

      <Section bg={mainPhoto}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="center"
        >
          <p className="label">Wedding invitation</p>

          <h1 className="title">
            {wedding.bride}
            <span className="ampersand">&</span>
            {wedding.groom}
          </h1>

          <div className="divider" />

          <p className="date">{wedding.date}</p>
          <p className="hero-text">
            Мы приглашаем вас разделить с нами день, который станет началом нашей семьи.
          </p>

          <motion.a
            href="#calendar"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="down-button"
          >
            <ChevronDown size={24} />
          </motion.a>
        </motion.div>
      </Section>

      <Section id="calendar" bg={photos[1]}>
        <motion.div {...fadeUp} className="center">
          <GlassCard>
            <p className="label" style={{ marginBottom: 10, letterSpacing: 6 }}>Save the date</p>
            <h2 className="calendar-title">{wedding.month}</h2>
            <p className="calendar-year">{wedding.year}</p>

            <div className="week-grid">
              {weekDays.map((day) => <div key={day}>{day}</div>)}
            </div>

            <div className="days-grid">
              {september2026.map((day, index) => (
                <div key={index} className={`day-cell ${day ? "" : "day-empty"} ${day === wedding.day ? "day-active" : ""}`}>
                  {day}
                </div>
              ))}
            </div>

            <div className="info-grid">
              <div className="info-box">
                <Calendar size={21} color="#ffffff" />
                <p className="info-small">Дата</p>
                <p className="info-main">{wedding.date}</p>
              </div>
              <div className="info-box">
                <Clock size={21} color="#ffffff" />
                <p className="info-small">Начало</p>
                <p className="info-main">{wedding.ceremonyTime}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </Section>

      <Section bg={photos[2]}>
        <motion.div {...fadeUp}>
          <p className="label center" style={{ marginBottom: 16 }}>Program</p>
          <h2 className="section-title">Программа</h2>

          <div className="program-list">
            {program.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="program-card"
                >
                  <div className="row">
                    <div className="icon-circle"><Icon size={22} /></div>
                    <div>
                      <p className="program-time">{item.time}</p>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-text">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Section>

      <Section bg={photos[3]}>
        <motion.div {...fadeUp} className="center">
          <GlassCard>
            <MapPin size={44} color="#ffffff" style={{ marginBottom: 18 }} />
            <p className="label" style={{ marginBottom: 12 }}>Location</p>
            <h2 className="location-title">{wedding.venue}</h2>
            <p className="location-address">{wedding.address}</p>

            <a href={wedding.maps} target="_blank" rel="noreferrer" className="route-button">
              <Navigation size={17} color="#11100f" />
              Открыть маршрут
            </a>
          </GlassCard>
        </motion.div>
      </Section>

      <Section bg={photos[4]}>
        <motion.div {...fadeUp}>
          <p className="label center" style={{ marginBottom: 16 }}>Details</p>
          <h2 className="section-title">Важные детали</h2>

          <div className="detail-list">
            <div className="detail-card">
              <div className="row">
                <Camera className="detail-icon" />
                <div>
                  <h3 className="card-title">Фото</h3>
                  <p className="card-text">Будем рады вашим фотографиям и видео после праздника.</p>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <div className="row">
                <Gift className="detail-icon" />
                <div>
                  <h3 className="card-title">Подарки</h3>
                  <p className="card-text">Главный подарок — ваше присутствие, улыбки и хорошее настроение.</p>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <div className="row">
                <Sparkles className="detail-icon" />
                <div>
                  <h3 className="card-title">Дресс-код</h3>
                  <p className="card-text">Пастельные, молочные, бежевые и светлые оттенки.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <section id="rsvp" className="rsvp-section">
        <div className="rsvp-content">
          <motion.div {...fadeUp} className="rsvp-card">
            <p className="rsvp-label">RSVP</p>
            <h2 className="rsvp-title">Ответ гостя</h2>
            <p className="rsvp-text">
              Пожалуйста, подтвердите присутствие {wedding.rsvpDeadline}.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-box"
              >
                <CheckCircle2 size={48} color="#e4576f" style={{ marginBottom: 14 }} />
                <h3 className="success-title">Спасибо, {name || "дорогой гость"}!</h3>
                <p className="success-text">
                  Ответ пока сохраняется только визуально. Следующий шаг — подключить отправку в Google Sheets или WhatsApp.
                </p>
                <div className="summary-box">
                  <p><b>Статус:</b> {attending}</p>
                  <p><b>Гостей:</b> {guests}</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="form">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ваше имя"
                  className="form-field"
                />

                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="form-field">
                  <option>1 гость</option>
                  <option>2 гостя</option>
                  <option>3 гостя</option>
                  <option>4 гостя</option>
                </select>

                <select value={attending} onChange={(e) => setAttending(e.target.value)} className="form-field">
                  <option>Да, буду</option>
                  <option>К сожалению, не смогу</option>
                  <option>Пока не знаю</option>
                </select>

                <button className="submit-button">
                  <Send size={17} />
                  Отправить
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}