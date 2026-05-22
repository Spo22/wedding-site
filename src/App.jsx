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
  HelpCircle,
  MapPin,
  MessageCircle,
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
  dinnerTime: "18:00",
  venue: "White Garden Hall",
  address: "Yerevan, Armenia",
  rsvpDeadline: "до 1 сентября 2026",
  whatsapp: "https://wa.me/37400000000",
};

const photos = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1509610973147-232dfea52a97?auto=format&fit=crop&w=1600&q=90",
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

function Section({ children, bg, dark = true, className = "" }) {
  return (
    <section className={`relative min-h-screen overflow-hidden px-5 py-10 ${className}`}>
      {bg && <img src={bg} alt="Wedding background" className="absolute inset-0 h-full w-full object-cover" />}
      {bg && <div className={`absolute inset-0 ${dark ? "bg-black/55" : "bg-white/65"}`} />}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        {children}
      </div>
    </section>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-white/25 bg-white/15 p-6 shadow-2xl backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

export default function WeddingInvitation() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState("Да, буду");
  const [sent, setSent] = useState(false);

  const mainPhoto = useMemo(() => photos[0], []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#11100f] text-white">
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a
          href="#faq"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2aaa0] text-white shadow-2xl transition hover:scale-105"
          aria-label="Questions"
        >
          <HelpCircle className="h-7 w-7" />
        </a>
        <a
          href={wedding.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#98df77] text-white shadow-2xl transition hover:scale-105"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </div>

      <Section bg={mainPhoto} className="snap-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1 }}
          className="text-center"
        >
          <p className="mb-8 tracking-[0.45em] text-xs uppercase text-white/75">Wedding invitation</p>

          <h1 className="font-serif text-6xl leading-[0.92] drop-shadow-2xl">
            {wedding.bride}
            <span className="my-3 block text-4xl italic text-white/90">&</span>
            {wedding.groom}
          </h1>

          <div className="mx-auto my-9 h-px w-24 bg-white/60" />

          <p className="text-2xl font-light tracking-[0.22em]">{wedding.date}</p>
          <p className="mt-5 text-sm leading-7 text-white/80">
            Мы приглашаем вас разделить с нами день, который станет началом нашей семьи.
          </p>

          <motion.a
            href="#calendar"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="mx-auto mt-14 flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-white/10 backdrop-blur-md"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.a>
        </motion.div>
      </Section>

      <Section id="calendar" bg={photos[1]}>
        <motion.div {...fadeUp} className="text-center">
          <GlassCard>
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-white/65">Save the date</p>
            <h2 className="font-serif text-5xl italic">{wedding.month}</h2>
            <p className="mt-1 text-lg tracking-[0.3em] text-white/75">{wedding.year}</p>

            <div className="mt-8 grid grid-cols-7 gap-2 text-center text-xs text-white/60">
              {weekDays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm">
              {september2026.map((day, index) => (
                <div
                  key={index}
                  className={`flex h-9 items-center justify-center rounded-full ${
                    day === wedding.day
                      ? "bg-white text-stone-950 shadow-lg shadow-white/30"
                      : day
                      ? "text-white/85"
                      : "text-transparent"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-white/15 p-4">
                <Calendar className="mx-auto mb-2 h-5 w-5" />
                <p className="text-sm text-white/70">Дата</p>
                <p className="font-medium">{wedding.date}</p>
              </div>
              <div className="rounded-3xl bg-white/15 p-4">
                <Clock className="mx-auto mb-2 h-5 w-5" />
                <p className="text-sm text-white/70">Начало</p>
                <p className="font-medium">{wedding.ceremonyTime}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </Section>

      <Section bg={photos[2]}>
        <motion.div {...fadeUp}>
          <p className="mb-4 text-center text-sm uppercase tracking-[0.35em] text-white/70">Program</p>
          <h2 className="mb-8 text-center font-serif text-5xl">Программа</h2>

          <div className="space-y-4">
            {program.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="rounded-[1.7rem] border border-white/20 bg-white/15 p-5 backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-stone-950">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-serif">{item.time}</p>
                      <h3 className="mt-1 text-xl font-medium">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/75">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Section>

      <Section bg={photos[3]}>
        <motion.div {...fadeUp} className="text-center">
          <GlassCard>
            <MapPin className="mx-auto mb-5 h-10 w-10" />
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/65">Location</p>
            <h2 className="font-serif text-5xl">{wedding.venue}</h2>
            <p className="mx-auto mt-5 max-w-xs leading-7 text-white/75">{wedding.address}</p>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-stone-950 shadow-xl"
            >
              <Navigation className="h-4 w-4" />
              Открыть маршрут
            </a>
          </GlassCard>
        </motion.div>
      </Section>

      <Section bg={photos[4]}>
        <motion.div {...fadeUp}>
          <p className="mb-4 text-center text-sm uppercase tracking-[0.35em] text-white/70">Details</p>
          <h2 className="mb-8 text-center font-serif text-5xl">Важные детали</h2>

          <div className="grid gap-4">
            <GlassCard className="p-5">
              <div className="flex items-start gap-4">
                <Camera className="mt-1 h-6 w-6 shrink-0" />
                <div>
                  <h3 className="text-xl font-medium">Фото</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">Будем рады вашим фотографиям и видео после праздника.</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-start gap-4">
                <Gift className="mt-1 h-6 w-6 shrink-0" />
                <div>
                  <h3 className="text-xl font-medium">Подарки</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">Главный подарок — ваше присутствие, улыбки и хорошее настроение.</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-start gap-4">
                <Sparkles className="mt-1 h-6 w-6 shrink-0" />
                <div>
                  <h3 className="text-xl font-medium">Дресс-код</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">Пастельные, молочные, бежевые и светлые оттенки.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </Section>

      <section id="faq" className="relative min-h-screen bg-[#f7f0e8] px-5 py-10 text-stone-950">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
          <motion.div {...fadeUp} className="rounded-[2rem] bg-white p-6 shadow-2xl">
            <p className="mb-3 text-center text-sm uppercase tracking-[0.35em] text-rose-400">RSVP</p>
            <h2 className="text-center font-serif text-5xl">Ответ гостя</h2>
            <p className="mt-4 text-center text-sm leading-6 text-stone-500">
              Пожалуйста, подтвердите присутствие {wedding.rsvpDeadline}.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-[1.7rem] bg-[#f7f0e8] p-6 text-center"
              >
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-rose-400" />
                <h3 className="font-serif text-3xl">Спасибо!</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  Ответ сохранён на странице. Для настоящей отправки можно подключить Google Forms, Telegram или Google Sheets.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ваше имя"
                  className="rounded-2xl border border-stone-200 bg-[#fbf7f2] px-5 py-4 outline-none focus:border-rose-300"
                />

                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="rounded-2xl border border-stone-200 bg-[#fbf7f2] px-5 py-4 outline-none focus:border-rose-300"
                >
                  <option>1 гость</option>
                  <option>2 гостя</option>
                  <option>3 гостя</option>
                  <option>4 гостя</option>
                </select>

                <select
                  value={attending}
                  onChange={(e) => setAttending(e.target.value)}
                  className="rounded-2xl border border-stone-200 bg-[#fbf7f2] px-5 py-4 outline-none focus:border-rose-300"
                >
                  <option>Да, буду</option>
                  <option>К сожалению, не смогу</option>
                  <option>Пока не знаю</option>
                </select>

                <button className="mt-2 flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-4 text-white shadow-xl">
                  <Send className="h-4 w-4" />
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
