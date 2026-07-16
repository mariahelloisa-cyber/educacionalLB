import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  GraduationCap,
  Award,
  Briefcase,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Phone,
  ArrowRight,
  Zap,
  Headphones,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const WHATSAPP_NUMBER = "5500000000000"; // TODO: substituir pelo número real

type Course = {
  id: string;
  category: "EJA" | "TÉCNICO" | "COMPETÊNCIA";
  categoryLabel: string;
  title: string;
  price: string;
  workload: string;
  duration: string;
  modality: string;
  description: string;
  icon: typeof GraduationCap;
  accent: "brand" | "brand-dark" | "cta";
};

const CATEGORIES: Course["category"][] = ["EJA", "TÉCNICO", "COMPETÊNCIA"];

const COURSES: Course[] = [
  {
    id: "eja-fundamental",
    category: "EJA",
    categoryLabel: "Ensino de Jovens e Adultos - EJA",
    title: "EJA — Ensino Fundamental",
    price: "R$ 799,00",
    workload: "800h",
    duration: "3 a 6 meses",
    modality: "EAD",
    description:
      "O curso de EJA – Ensino Fundamental é destinado a jovens e adultos que desejam concluir os estudos básicos, oferecendo aprendizagem prática e adaptada às necessidades do estudante, valorizando a educação, a cidadania e o desenvolvimento pessoal.",
    icon: GraduationCap,
    accent: "brand-dark",
  },
  {
    id: "eja-medio",
    category: "EJA",
    categoryLabel: "Ensino de Jovens e Adultos - EJA",
    title: "EJA — Ensino Médio",
    price: "R$ 799,00",
    workload: "1200h",
    duration: "4 a 6 meses",
    modality: "EAD",
    description:
      "O curso de EJA – Ensino Médio é voltado para jovens e adultos que buscam concluir a educação básica, proporcionando conhecimentos gerais, preparação para o mercado de trabalho e desenvolvimento pessoal, promovendo cidadania e aprendizado contínuo.",
    icon: GraduationCap,
    accent: "brand-dark",
  },
  {
    id: "eja-2-0",
    category: "EJA",
    categoryLabel: "Ensino de Jovens e Adultos - EJA",
    title: "EJA 2.0 — Ensino Fundamental + Médio",
    price: "R$ 799,00",
    workload: "2000h",
    duration: "4 a 6 meses",
    modality: "EAD",
    description:
      "O curso EJA 2.0 – Ensino Fundamental e Médio é destinado a jovens e adultos que desejam concluir toda a educação básica de forma prática e acessível, unindo aprendizado, desenvolvimento pessoal e preparação para oportunidades acadêmicas e profissionais.",
    icon: GraduationCap,
    accent: "brand-dark",
  },
  {
    id: "tecnico",
    category: "TÉCNICO",
    categoryLabel: "Cursos Técnicos",
    title: "Cursos Técnicos Profissionalizantes",
    price: "A partir de R$ 899,00",
    workload: "1200h",
    duration: "12 a 18 meses",
    modality: "EAD",
    description:
      "Formação técnica reconhecida pelo MEC nas áreas de maior demanda do mercado: Administração, Enfermagem, Segurança do Trabalho, Logística, Informática e mais. Aulas 100% EAD com material completo e suporte tutorial.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "competencia",
    category: "COMPETÊNCIA",
    categoryLabel: "Certificação por Competência",
    title: "Técnico por Certificação de Competência",
    price: "R$ 1.299,00",
    workload: "Validação de saberes",
    duration: "Conclusão rápida",
    modality: "EAD",
    description:
      "Se você já atua profissionalmente na área, transforme sua experiência em um diploma técnico oficial. Processo de certificação por competência reconhecido, com validação de conhecimentos práticos e teóricos.",
    icon: Award,
    accent: "brand",
  },
];

function LandingPage() {
  const [openCourse, setOpenCourse] = useState<Course | null>(null);

  const whatsappLink = useMemo(
    () =>
      (course?: Course) =>
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          course
            ? `Olá! Tenho interesse no curso: ${course.title} (${course.price}). Poderia me passar mais informações?`
            : "Olá! Quero fazer minha matrícula no Instituto Educacional LB.",
        )}`,
    [],
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = data.get("nome");
    const message = `Olá! Quero me matricular.%0A%0A*Nome:* ${nome}%0A*Telefone:* ${data.get("telefone")}%0A*E-mail:* ${data.get("email")}%0A*Curso de interesse:* ${data.get("curso")}%0A*Mensagem:* ${data.get("mensagem") || "-"}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    toast.success("Redirecionando para o WhatsApp...", {
      description: "Nossa equipe vai te atender em instantes.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-gradient-hero text-white">
        {/* Promo ribbon */}
        <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-xs font-medium text-white/90 md:text-sm">
            <Sparkles className="h-4 w-4 text-cta" />
            <span>
              <strong className="text-cta">TEMPO LIMITADO:</strong> até 50% OFF na matrícula + material didático incluso.{" "}
              <button onClick={() => scrollTo("cursos")} className="underline underline-offset-2 hover:text-white">
                Ver cursos
              </button>
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr_1fr] md:gap-14 md:px-8 md:py-24">
          {/* LEFT */}
          <div className="flex flex-col">
            <Badge className="mb-5 w-fit rounded-full bg-cta/20 px-3 py-1 text-cta hover:bg-cta/25 border border-cta/30">
              Matrículas abertas 2026
            </Badge>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] md:text-6xl">
              Conclua seus estudos.
              <br />
              <span className="text-brand">Conquiste seu diploma.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
              Torne-se profissional com os cursos <strong>EJA</strong>, <strong>Técnicos</strong> e{" "}
              <strong>Certificação por Competência</strong>. 100% EAD, diploma reconhecido e suporte do início ao fim.
            </p>

            {/* Feature grid */}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
              {[
                { title: "Diploma reconhecido", desc: "Válido em todo o território nacional." },
                { title: "Estude no seu ritmo", desc: "Plataforma 100% online, 24h por dia." },
                { title: "Suporte tutorial", desc: "Equipe pedagógica sempre com você." },
                { title: "Parcelamento fácil", desc: "Condições acessíveis no boleto ou cartão." },
              ].map((f) => (
                <div key={f.title}>
                  <div className="flex items-center gap-2 font-display text-sm font-bold text-brand md:text-base">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> {f.title}
                  </div>
                  <p className="mt-1 text-xs text-white/75 md:text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — inline form card */}
          <div className="relative">
            <div className="absolute -right-3 -top-3 z-20 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-cta text-center font-display font-extrabold leading-tight text-cta-foreground shadow-cta md:h-24 md:w-24">
              <div>
                <div className="text-xl md:text-2xl">-50%</div>
                <div className="text-[9px] uppercase tracking-wide md:text-[10px]">só hoje</div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl bg-white p-6 text-foreground shadow-elegant md:p-8"
            >
              <h3 className="font-display text-2xl font-extrabold text-primary md:text-3xl">Inscreva-se</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Início da próxima turma: <strong className="text-primary">este mês</strong>
              </p>

              <div className="mt-5 grid gap-3">
                <Input name="nome" required placeholder="Nome completo" className="h-12 rounded-xl" />
                <Input name="email" type="email" required placeholder="E-mail" className="h-12 rounded-xl" />
                <div className="flex items-center gap-2 rounded-xl border border-input pl-3">
                  <span className="text-base">🇧🇷</span>
                  <Input
                    name="telefone"
                    required
                    placeholder="+55 (00) 00000-0000"
                    className="h-12 rounded-xl border-0 pl-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <select
                  name="curso"
                  required
                  defaultValue=""
                  className="h-12 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="" disabled>Curso de interesse</option>
                  {COURSES.map((c) => (
                    <option key={c.id}>{c.title}</option>
                  ))}
                </select>
                <input type="hidden" name="mensagem" value="Vim pela hero da landing page" />

                <label className="mt-1 flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[color:var(--brand-dark)]" />
                  <span>
                    Eu li e aceito os termos e condições da Política de Privacidade do Instituto Educacional LB.
                  </span>
                </label>

                <Button
                  type="submit"
                  className="mt-2 h-14 rounded-xl bg-cta text-base font-extrabold uppercase tracking-wide text-cta-foreground shadow-cta hover:bg-cta/90"
                >
                  Inscreva-se agora
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-7xl justify-center border-t border-white/15 px-4 pb-16 pt-6 md:px-8 md:pb-24">
          <Button
            size="lg"
            onClick={() => scrollTo("matricula")}
            className="h-16 bg-cta px-10 text-lg font-bold text-cta-foreground shadow-cta hover:bg-cta/90"
          >
            <ShoppingBag className="mr-2 h-6 w-6" />
            Faça já sua matrícula
          </Button>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="bg-brand/10 text-primary">Por que escolher a LB</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Educação séria, prática e acessível</h2>
            <p className="mt-4 text-muted-foreground">Tudo o que você precisa para transformar sua carreira e sua vida.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Diploma reconhecido", desc: "Certificação válida em todo o território nacional." },
              { icon: Clock, title: "Estude no seu tempo", desc: "Plataforma 100% online, 24h por dia." },
              { icon: Award, title: "Suporte tutorial", desc: "Equipe pedagógica para tirar suas dúvidas." },
              { icon: Sparkles, title: "Preço acessível", desc: "Condições e parcelamento facilitados." },
            ].map((b) => (
              <div key={b.title} className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURSOS */}
      <section id="cursos" className="bg-secondary/40 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="bg-brand text-brand-foreground hover:bg-brand">Nossos cursos</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Escolha o caminho ideal para você</h2>
            <p className="mt-4 text-muted-foreground">Três categorias pensadas para diferentes momentos da sua jornada.</p>
          </div>

          <div className="mt-14 space-y-14">
            {CATEGORIES.map((category) => {
              const coursesInCategory = COURSES.filter((c) => c.category === category);
              if (coursesInCategory.length === 0) return null;
              return (
                <div key={category}>
                  <h3 className="font-display text-xl font-bold text-primary md:text-2xl">
                    {coursesInCategory[0].categoryLabel}
                  </h3>
                  <div className="mt-6 grid gap-8 md:grid-cols-3">
                    {coursesInCategory.map((course) => (
                      <CourseCard key={course.id} course={course} onOpen={() => setOpenCourse(course)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MATRÍCULA */}
      <section id="matricula" className="relative overflow-hidden bg-gradient-hero py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <Badge className="mb-4 bg-white/15 text-white hover:bg-white/25 border-white/20">Matrícula rápida</Badge>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Dê o primeiro passo agora mesmo</h2>
            <p className="mt-4 text-white/85">Preencha o formulário e nossa equipe entrará em contato pelo WhatsApp para finalizar sua matrícula.</p>

            <ul className="mt-8 space-y-3">
              {["Atendimento humanizado", "Confirmação imediata via WhatsApp", "Sem burocracia — comece hoje"].map((i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-brand" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-lg bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/20"
            >
              <Phone className="h-4 w-4" /> Prefere falar direto? Chame no WhatsApp
            </a>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 text-foreground shadow-elegant md:p-8">
            <h3 className="font-display text-xl font-bold text-primary">Faça sua matrícula</h3>
            <p className="mt-1 text-sm text-muted-foreground">Resposta em minutos.</p>

            <div className="mt-6 grid gap-4">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" name="nome" required placeholder="Seu nome" className="mt-1.5" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="telefone">WhatsApp</Label>
                  <Input id="telefone" name="telefone" required placeholder="(00) 00000-0000" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" required placeholder="voce@email.com" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="curso">Curso de interesse</Label>
                <select
                  id="curso"
                  name="curso"
                  required
                  className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue=""
                >
                  <option value="" disabled>Selecione uma opção</option>
                  {COURSES.map((c) => (
                    <option key={c.id}>{c.title}</option>
                  ))}
                  <option>Ainda não decidi</option>
                </select>
              </div>
              <div>
                <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                <Textarea id="mensagem" name="mensagem" rows={3} placeholder="Conte um pouco sobre você" className="mt-1.5" />
              </div>

              <Button
                type="submit"
                size="lg"
                className="bg-cta text-cta-foreground hover:bg-cta/90 shadow-cta font-bold h-12"
              >
                Enviar e falar no WhatsApp
              </Button>
              <p className="text-center text-xs text-muted-foreground">Ao enviar, você concorda em ser contatado pela nossa equipe.</p>
            </div>
          </form>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-primary text-center text-primary-foreground">
        <div className="mx-auto max-w-2xl px-4 py-10 md:px-8 md:py-14">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Transforme seu futuro com a educação certa.
          </h2>
          <p className="mt-4 text-primary-foreground/70 md:text-lg">
            Comece hoje mesmo sua jornada profissional com cursos reconhecidos e atendimento imediato.
          </p>
          <button
            onClick={() => scrollTo("matricula")}
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-semibold text-black transition hover:bg-white/90 md:px-12 md:py-6 md:text-lg"
          >
            Fazer matrícula
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="w-full bg-black/25">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-7 sm:grid-cols-4 sm:divide-x sm:divide-white/10 md:px-8">
            {[
              { icon: GraduationCap, title: "Certificado reconhecido", desc: "Válido em todo o Brasil" },
              { icon: Zap, title: "Matrícula rápida", desc: "Processo 100% online" },
              { icon: Headphones, title: "Atendimento humanizado", desc: "Suporte via WhatsApp" },
              { icon: CreditCard, title: "Parcelamento facilitado", desc: "Condições que cabem no bolso" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-2 text-left sm:justify-center sm:px-4">
                <item.icon className="h-5 w-5 shrink-0 text-cta" />
                <div>
                  <div className="text-xs font-semibold text-white">{item.title}</div>
                  <div className="text-[11px] text-cta">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary py-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Instituto Educacional LB. Todos os direitos reservados.
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant transition hover:scale-110"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current"><path d="M19.11 17.31c-.29-.15-1.7-.84-1.97-.94-.26-.1-.46-.15-.65.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.24-.57-.48-.5-.65-.5-.17-.01-.36-.01-.55-.01-.19 0-.51.07-.77.36-.26.29-1 .98-1 2.4 0 1.42 1.03 2.78 1.17 2.98.14.19 2.02 3.09 4.9 4.33.69.3 1.22.48 1.64.61.69.22 1.31.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM16.03 5C9.94 5 5 9.94 5 16.03c0 1.94.51 3.83 1.47 5.5L5 27l5.62-1.47a10.94 10.94 0 0 0 5.41 1.37c6.09 0 11.03-4.94 11.03-11.03S22.12 5 16.03 5z"/></svg>
      </a>

      <CourseModal course={openCourse} onClose={() => setOpenCourse(null)} whatsappLink={whatsappLink} />
    </div>
  );
}

function CourseCard({ course, onOpen }: { course: Course; onOpen: () => void }) {
  const Icon = course.icon;
  const bgClass =
    course.accent === "brand-dark"
      ? "bg-gradient-hero"
      : course.accent === "brand"
        ? "bg-gradient-brand"
        : "bg-gradient-brand";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-elegant">
      <div className={`${bgClass} relative flex h-56 items-center justify-center overflow-hidden text-white`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Icon className="h-8 w-8" />
          </div>
          <div className="font-display text-xl font-bold leading-tight">{course.category}</div>
          <Badge className="bg-cta text-cta-foreground hover:bg-cta">Diploma reconhecido</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Badge variant="secondary" className="w-fit bg-brand/10 text-primary">{course.categoryLabel}</Badge>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug">{course.title}</h3>

        <div className="mt-6 border-t border-border pt-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Condições</div>
          <div className="mt-1 font-display text-2xl font-bold text-primary">{course.price}</div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Quero comprar o curso: ${course.title}`)}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="w-full bg-cta text-cta-foreground hover:bg-cta/90 shadow-cta font-semibold h-11">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Comprar Agora
            </Button>
          </a>
          <Button
            variant="outline"
            className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground h-11 font-semibold"
            onClick={onOpen}
          >
            Saiba Mais
          </Button>
        </div>
      </div>
    </article>
  );
}

function CourseModal({
  course,
  onClose,
  whatsappLink,
}: {
  course: Course | null;
  onClose: () => void;
  whatsappLink: (c?: Course) => string;
}) {
  return (
    <Dialog open={!!course} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        {course && (
          <>
            <DialogHeader className="border-b border-border bg-secondary/40 px-6 py-4">
              <DialogTitle className="font-display text-lg">Detalhes do Curso</DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
              <div className="bg-gradient-hero relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl text-white">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
                <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <course.icon className="h-10 w-10" />
                  </div>
                  <div className="font-display text-2xl font-bold">{course.category}</div>
                  <Badge className="bg-cta text-cta-foreground hover:bg-cta">Diploma reconhecido</Badge>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="font-display text-2xl font-bold leading-tight text-primary">{course.title}</h2>
                <Badge variant="secondary" className="mt-3 w-fit bg-brand/10 text-primary">{course.categoryLabel}</Badge>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Carga Horária</div>
                    <div className="mt-1 font-display text-base font-bold">{course.workload}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Prazo</div>
                    <div className="mt-1 font-display text-base font-bold">{course.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Modalidade</div>
                    <div className="mt-1 font-display text-base font-bold">{course.modality}</div>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Condições</div>
                  <div className="mt-1 font-display text-3xl font-extrabold text-primary">{course.price}</div>
                </div>

                <a
                  href={whatsappLink(course)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6"
                >
                  <Button className="w-full bg-cta text-cta-foreground hover:bg-cta/90 shadow-cta font-bold h-12">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Comprar Agora
                  </Button>
                </a>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
