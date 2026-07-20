import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import logoLb from "@/assets/logo-bg.png";
import capaHero from "@/assets/herorio.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const WHATSAPP_NUMBER = "5521968984525";

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getPricing(price: string) {
  const finalValue = parseFloat(price.replace(/[^0-9,]/g, "").replace(",", "."));
  const originalValue = finalValue * 2;
  const installmentValue = finalValue / 12;
  const discountPercent = Math.round(((originalValue - finalValue) / originalValue) * 100);
  return {
    original: formatBRL(originalValue),
    discountPercent,
    installments: `12x de ${formatBRL(installmentValue)} sem juros no cartão`,
  };
}

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
  image: string;
};

const CATEGORIES: Course["category"][] = ["EJA", "TÉCNICO", "COMPETÊNCIA"];

const COURSES: Course[] = [
  {
    id: "eja-fundamental",
    image:
      "https://images.pexels.com/photos/14658819/pexels-photo-14658819.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image:
      "https://images.pexels.com/photos/14658819/pexels-photo-14658819.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image:
      "https://images.pexels.com/photos/14658819/pexels-photo-14658819.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    id: "tecnico-administracao",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Administração",
    price: "R$ 899,00",
    workload: "880h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-analises-clinicas",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Análises Clínicas",
    price: "R$ 899,00",
    workload: "1400h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-automacao-industrial",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Automação Industrial",
    price: "R$ 899,00",
    workload: "1230h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-compliance",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Compliance",
    price: "R$ 899,00",
    workload: "960h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-computacao-grafica",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Computação Gráfica",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-contabilidade",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Contabilidade",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-cuidador-idosos",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Cuidador de Idosos",
    price: "R$ 899,00",
    workload: "1400h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-eletroeletronica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Eletroeletrônica",
    price: "R$ 899,00",
    workload: "1440h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-eletrotecnica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Eletrotécnica",
    price: "R$ 899,00",
    workload: "1600h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-estetica",
    image:
      "https://images.pexels.com/photos/3736398/pexels-photo-3736398.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Estética",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-farmacia",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Farmácia",
    price: "R$ 899,00",
    workload: "1600h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-gastronomia",
    image:
      "https://images.pexels.com/photos/5251019/pexels-photo-5251019.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Gastronomia",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-guia-turismo",
    image:
      "https://images.pexels.com/photos/17087507/pexels-photo-17087507.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Guia de Turismo",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-informatica",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Informática",
    price: "R$ 899,00",
    workload: "1600h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-logistica",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Logística",
    price: "R$ 899,00",
    workload: "960h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-mecanica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Mecânica",
    price: "R$ 899,00",
    workload: "1220h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-metalurgia",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Metalurgia",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-mineracao",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Mineração",
    price: "R$ 899,00",
    workload: "1300h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-optometria",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Optometria",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-papel-celulose",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Papel e Celulose",
    price: "R$ 899,00",
    workload: "1210h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-podologia",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Podologia",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-refrigeracao-climatizacao",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Refrigeração e Climatização",
    price: "R$ 899,00",
    workload: "1440h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-seguranca-trabalho",
    image:
      "https://images.pexels.com/photos/11429201/pexels-photo-11429201.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Segurança do Trabalho",
    price: "R$ 899,00",
    workload: "1600h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-telecomunicacoes",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Telecomunicações",
    price: "R$ 899,00",
    workload: "1440h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-veterinaria",
    image:
      "https://images.pexels.com/photos/6235240/pexels-photo-6235240.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Veterinária",
    price: "R$ 899,00",
    workload: "1400h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-recursos-humanos",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Recursos Humanos",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-mecatronica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Mecatrônica",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-transacoes-imobiliarias",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Transações Imobiliárias",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-informatica-internet",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Informática para Internet",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-meio-ambiente",
    image:
      "https://images.pexels.com/photos/3655865/pexels-photo-3655865.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Meio Ambiente",
    price: "R$ 899,00",
    workload: "1440h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-quimica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Química",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-prevencao-combate-incendio",
    image:
      "https://images.pexels.com/photos/11429201/pexels-photo-11429201.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Prevenção e Combate ao Incêndio",
    price: "R$ 899,00",
    workload: "1000h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-qualidade",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Qualidade",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-secretaria-escolar",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Secretaria Escolar",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-agente-comunitario-saude",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Agente Comunitário de Saúde",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-agrimensura",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Agrimensura",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-desenvolvimento-sistemas",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Desenvolvimento de Sistemas",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-design-grafico",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Design Gráfico",
    price: "R$ 899,00",
    workload: "1000h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-edificacoes",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Edificações",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-eletronica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Eletrônica",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-financas",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Finanças",
    price: "R$ 899,00",
    workload: "960h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-inteligencia-artificial",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Inteligência Artificial",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-manutencao-automotiva",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Manutenção Automotiva",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-manutencao-maquinas-industriais",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Manutenção de Máquinas Industriais",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-marketing",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Marketing",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-nutricao-dietetica",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Nutrição e Dietética",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-petroleo-gas",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Petróleo e Gás",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-protese-dentaria",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Prótese Dentária",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-redes-computadores",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Redes de Computadores",
    price: "R$ 899,00",
    workload: "1000h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-saude-bucal",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Saúde Bucal",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-servicos-juridicos",
    image:
      "https://images.pexels.com/photos/7876191/pexels-photo-7876191.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Serviços Jurídicos",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-energia-renovavel",
    image:
      "https://images.pexels.com/photos/3655865/pexels-photo-3655865.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Sistema de Energia Renovável",
    price: "R$ 899,00",
    workload: "1200h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-teologia",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Teologia",
    price: "R$ 899,00",
    workload: "1000h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-vendas",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Vendas",
    price: "R$ 899,00",
    workload: "800h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "tecnico-eletromecanica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "TÉCNICO",
    categoryLabel: "Técnico por Competência",
    title: "Técnico por Competência em Eletromecânica",
    price: "R$ 899,00",
    workload: "1600h",
    duration: "6 a 12 meses",
    modality: "EAD",
    description:
      "Um curso técnico é uma formação de nível médio voltada para a prática profissional, que combina conhecimentos teóricos e habilidades aplicadas em uma área específica.",
    icon: Briefcase,
    accent: "brand",
  },
  {
    id: "ct-podologia",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Podologia",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Domine a saúde e estética dos pés! Aprenda técnicas avançadas de podologia, patologias, tratamentos e autocuidado para oferecer soluções completas aos pacientes.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-protese-dentaria",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Prótese Dentária",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Transforme sorrisos com precisão! Desenvolva habilidades em protética fixa e removível, materiais odontológicos e técnicas aplicadas para restaurações perfeitas.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-manutencao-automotiva",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Manutenção Automotiva",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Domine a mecânica automotiva moderna! Aprenda motores, sistemas elétricos, soldagem e gestão para manter veículos em perfeito funcionamento.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-agronegocio",
    image:
      "https://images.pexels.com/photos/12982186/pexels-photo-12982186.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Agronegócio",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Revolucione a produção agrícola! Combine técnicas rurais com gestão empresarial, marketing e projetos para maximizar a rentabilidade do negócio.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-computacao-grafica",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Computação Gráfica",
    price: "R$ 1.299,00",
    workload: "1200h",
    duration: "15 meses",
    modality: "EAD",
    description:
      "Crie obras digitais impressionantes! Domine design gráfico, modelagem 3D, edição audiovisual e programação para destacar-se no mercado criativo.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-confeitaria",
    image:
      "https://images.pexels.com/photos/5251019/pexels-photo-5251019.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Confeitaria",
    price: "R$ 1.299,00",
    workload: "960h",
    duration: "12 meses",
    modality: "EAD",
    description:
      "Conquiste paladares com criatividade! Especialize-se em massas, biscoitos, alimentos especiais e técnicas de conservação para criar doces memoráveis.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-desenho-construcao-civil",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Desenho de Construção Civil",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Projete estruturas impressionantes! Domine desenho técnico, CAD, instalações hidráulicas e elétricas para transformar ideias em construções reais.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-desenho-eletroeletronica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Desenho de Eletroeletrônica",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Projete circuitos inteligentes! Combine eletrônica analógica e digital, programação lógica e sistemas de potência para inovação tecnológica.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-programacao-jogos-digitais",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Programação de Jogos Digitais",
    price: "R$ 1.299,00",
    workload: "1200h",
    duration: "15 meses",
    modality: "EAD",
    description:
      "Crie mundos interativos emocionantes! Domine programação, game design, animação 3D e empreendedorismo para lançar seus próprios games.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-massoterapia",
    image:
      "https://images.pexels.com/photos/9146364/pexels-photo-9146364.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Massoterapia",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Alivie tensões e promova bem-estar! Especialize-se em técnicas clássicas, reflexologia, shiatsu e tratamentos complementares para transformar vidas.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-mecanica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Mecânica",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Domine a precisão industrial! Aprenda desenho mecânico, metrologia, tecnologia usinagem e gestão da produção para indústria de ponta.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-mecatronica",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Mecatrônica",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Integre mecanismo, eletrônica e computação! Desenvolva robôs e sistemas automatizados controlados por computador para a indústria 4.0.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-optometria",
    image:
      "https://images.pexels.com/photos/15641095/pexels-photo-15641095.png?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Optometria",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Resgate a visão com precisão! Domine óptica física, técnicas refrativas, contato lógico e oftalmologia para cuidado visual completo.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-saneamento",
    image:
      "https://images.pexels.com/photos/3655865/pexels-photo-3655865.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Saneamento",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Garanta saúde pública e ambiental! Trabalhe com sistemas de água, esgoto e tratamento de resíduos para comunidades mais sustentáveis.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-financas",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Finanças",
    price: "R$ 1.299,00",
    workload: "960h",
    duration: "12 meses",
    modality: "EAD",
    description:
      "Domine o dinheiro com estratégia! Aprenda contabilidade, investimentos, análise de riscos e empreendedorismo para crescimento financeiro.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-seguros",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Seguros",
    price: "R$ 1.299,00",
    workload: "960h",
    duration: "12 meses",
    modality: "EAD",
    description:
      "Proteja patrimônios e vidas! Especialize-se em produtos seguros, análise de riscos, legislação e gestão de projetos para tranquilidade dos clientes.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-geoprocessamento",
    image:
      "https://images.pexels.com/photos/269908/pexels-photo-269908.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Geoprocessamento",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Mapeie o mundo com precisão! Domine cartografia, sensoriamento remoto, SIG e processamento digital de imagens para análises geoespaciais.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-publicidade",
    image:
      "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Publicidade",
    price: "R$ 1.299,00",
    workload: "960h",
    duration: "12 meses",
    modality: "EAD",
    description:
      "Crie campanhas que marcam presença! Combine teoria da comunicação, marketing digital, fotografia e redação para impactar audiências.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-estradas",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Estradas",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Construa infraestrutura de qualidade! Domine desenho de vias, geotecnia, pavimentação e drenagem para rodovias seguras e duráveis.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-petroleo-gas",
    image:
      "https://images.pexels.com/photos/31352672/pexels-photo-31352672.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Petróleo e Gás",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Explore energia estratégica! Aprenda exploração, perfuração, automação e sustentabilidade para setor essencial à economia global.",
    icon: Award,
    accent: "brand",
  },
  {
    id: "ct-inteligencia-artificial",
    image:
      "https://images.pexels.com/photos/12899156/pexels-photo-12899156.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "COMPETÊNCIA",
    categoryLabel: "Cursos Técnicos",
    title: "Técnico em Inteligência Artificial",
    price: "R$ 1.299,00",
    workload: "1440h",
    duration: "18 meses",
    modality: "EAD",
    description:
      "Inove com máquinas inteligentes! Domine machine learning, processamento de linguagem e sistemas de IA para revolucionar negócios e sociedade.",
    icon: Award,
    accent: "brand",
  },
];

function LandingPage() {
  const [openCourse, setOpenCourse] = useState<Course | null>(null);

  const whatsappLink = useMemo(
    () => (course?: Course) =>
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
        <div className="relative z-10 border-b border-black/10 bg-white backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-xs font-bold text-black md:text-sm">
            <Sparkles className="h-4 w-4 text-cta" />
            <span>
              <strong className="text-cta">TEMPO LIMITADO:</strong> até 50% OFF na matrícula +
              material didático incluso.{" "}
              <button
                onClick={() => scrollTo("cursos")}
                className="underline underline-offset-2 hover:text-black/70"
              >
                Ver cursos
              </button>
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="pointer-events-none absolute inset-0">
          <img
            src={capaHero}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: "0% top" }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 pb-16 pl-4 pt-8 md:grid-cols-[1.1fr_1fr] md:gap-14 md:pb-24 md:pl-6 md:pt-10 lg:max-w-none lg:pl-16 lg:pr-56 xl:pr-80">
          {/* TEXTOS */}
          <div className="flex flex-col">
            <Badge className="mb-5 w-fit rounded-full bg-cta/20 px-3 py-1 text-cta hover:bg-cta/25 border border-cta/30">
              Matrículas abertas 2026
            </Badge>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] md:text-6xl">
              <span className="text-black">Para você do Rio de Janeiro.</span>
              <br />
              <span className="text-3xl text-brand md:text-5xl">Termine seus estudos online.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium text-black md:text-lg">
              Torne-se profissional com cursos 100% online, diploma reconhecido e suporte do início
              ao fim.
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
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span className="inline-block rounded-md bg-white px-2 py-0.5">{f.title}</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-black md:text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FORMULÁRIO */}
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
              <h3 className="font-display text-2xl font-extrabold text-primary md:text-3xl">
                Inscreva-se
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Início da próxima turma: <strong className="text-primary">este mês</strong>
              </p>

              <div className="mt-5 grid gap-3">
                <Input
                  name="nome"
                  required
                  placeholder="Nome completo"
                  className="h-12 rounded-xl"
                />
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="E-mail"
                  className="h-12 rounded-xl"
                />
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
                  <option value="" disabled>
                    Curso de interesse
                  </option>
                  {COURSES.map((c) => (
                    <option key={c.id}>{c.title}</option>
                  ))}
                </select>
                <input type="hidden" name="mensagem" value="Vim pela hero da landing page" />

                <label className="mt-1 flex items-start gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 accent-[color:var(--brand-dark)]"
                  />
                  <span>
                    Eu li e aceito os termos e condições da Política de Privacidade do Instituto
                    Educacional LB.
                  </span>
                </label>

                <Button
                  type="submit"
                  className="mt-2 h-14 rounded-xl bg-primary text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-elegant hover:bg-primary/90"
                >
                  Inscreva-se agora
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="relative mx-auto -mt-8 flex max-w-7xl justify-center px-4 pb-8 md:-mt-14 md:px-8 md:pb-12">
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

      {/* CURSOS */}
      <section id="cursos" className="bg-secondary/40 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="bg-brand text-brand-foreground hover:bg-brand">Nossos cursos</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Escolha o caminho ideal para você
            </h2>
            <p className="mt-4 text-muted-foreground">
              Categorias pensadas para diferentes momentos da sua jornada.
            </p>
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
                  <div className="mt-6">
                    <CourseCarousel courses={coursesInCategory} onOpen={setOpenCourse} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="bg-gradient-hero pb-20 pt-6 text-white md:pb-24 md:pt-8">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="relative mx-auto overflow-hidden" style={{ width: 162, height: 72 }}>
              <img
                src={logoLb}
                alt="Instituto Educacional LB"
                style={{
                  position: "absolute",
                  left: -37,
                  top: -66,
                  width: 258,
                  height: 216,
                  maxWidth: "none",
                }}
              />
            </div>
            <Badge className="mt-2 bg-white/15 text-white hover:bg-white/25 border-white/20">
              Por que escolher a LB
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Educação séria, prática e acessível
            </h2>
            <p className="mt-4 text-white/85">
              Tudo o que você precisa para transformar sua carreira e sua vida.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Diploma reconhecido",
                desc: "Certificação válida em todo o território nacional.",
              },
              {
                icon: Clock,
                title: "Estude no seu tempo",
                desc: "Plataforma 100% online, 24h por dia.",
              },
              {
                icon: Award,
                title: "Suporte tutorial",
                desc: "Equipe pedagógica para tirar suas dúvidas.",
              },
              {
                icon: Sparkles,
                title: "Preço acessível",
                desc: "Condições e parcelamento facilitados.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="group rounded-2xl border border-border bg-card p-6 text-foreground transition hover:-translate-y-1 hover:shadow-elegant"
              >
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

      {/* URGÊNCIA / CONSULTORIA GRATUITA */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="bg-brand text-brand-foreground hover:bg-brand">
              Não perca mais tempo
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">
              Sua matrícula pode sair ainda hoje
            </h2>
            <p className="mt-4 text-muted-foreground">
              Enquanto você pensa, outros já estão estudando. O Instituto Educacional LB já ajudou
              milhares de alunos a conquistarem o diploma com uma orientação simples e gratuita.
            </p>
          </div>

          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="animate-soft-pulse relative overflow-hidden rounded-3xl border-2 border-cta/40 bg-card p-6 shadow-elegant md:p-10">
              <Badge className="animate-soft-float absolute right-5 top-5 bg-destructive text-white hover:bg-destructive">
                Vagas limitadas!
              </Badge>

              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-primary md:text-2xl">
                  🎓 Orientação Gratuita de Matrícula
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground md:text-base">
                  Fale com nossa equipe agora e descubra qual curso combina com você — com{" "}
                  <strong className="text-primary">até 50% de desconto</strong> só nesta semana.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    emoji: "⚡",
                    title: "Matrícula rápida",
                    desc: "Comece a estudar ainda hoje",
                  },
                  {
                    emoji: "💰",
                    title: "Parcelamento fácil",
                    desc: "Condições que cabem no bolso",
                  },
                  {
                    emoji: "🎯",
                    title: "Curso ideal pra você",
                    desc: "Orientação personalizada e gratuita",
                  },
                ].map((f) => (
                  <div key={f.title} className="rounded-xl bg-secondary/60 p-4 text-center">
                    <div className="text-2xl">{f.emoji}</div>
                    <div className="mt-2 font-display text-sm font-bold text-primary">
                      {f.title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{f.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <a href={whatsappLink()} target="_blank" rel="noreferrer">
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-gradient-hero px-8 text-base font-bold text-white shadow-elegant transition hover:scale-105"
                  >
                    🎯 Quero minha vaga agora!
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATRÍCULA */}
      <section
        id="matricula"
        className="relative overflow-hidden bg-gradient-hero py-20 text-white md:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <Badge className="mb-4 bg-white/15 text-white hover:bg-white/25 border-white/20">
              Matrícula rápida
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Dê o primeiro passo agora mesmo
            </h2>
            <p className="mt-4 text-white/85">
              Preencha o formulário e nossa equipe entrará em contato pelo WhatsApp para finalizar
              sua matrícula.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Atendimento humanizado",
                "Confirmação imediata via WhatsApp",
                "Sem burocracia — comece hoje",
              ].map((i) => (
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

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 text-foreground shadow-elegant md:p-8"
          >
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
                  <Input
                    id="telefone"
                    name="telefone"
                    required
                    placeholder="(00) 00000-0000"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="voce@email.com"
                    className="mt-1.5"
                  />
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
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {COURSES.map((c) => (
                    <option key={c.id}>{c.title}</option>
                  ))}
                  <option>Ainda não decidi</option>
                </select>
              </div>
              <div>
                <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  rows={3}
                  placeholder="Conte um pouco sobre você"
                  className="mt-1.5"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant font-bold h-12"
              >
                Enviar e falar no WhatsApp
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Ao enviar, você concorda em ser contatado pela nossa equipe.
              </p>
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
            Comece hoje mesmo sua jornada profissional com cursos reconhecidos e atendimento
            imediato.
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
              {
                icon: GraduationCap,
                title: "Certificado reconhecido",
                desc: "Válido em todo o Brasil",
              },
              { icon: Zap, title: "Matrícula rápida", desc: "Processo 100% online" },
              { icon: Headphones, title: "Atendimento humanizado", desc: "Suporte via WhatsApp" },
              {
                icon: CreditCard,
                title: "Parcelamento facilitado",
                desc: "Condições que cabem no bolso",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2 text-left sm:justify-center sm:px-4"
              >
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
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
          <path d="M19.11 17.31c-.29-.15-1.7-.84-1.97-.94-.26-.1-.46-.15-.65.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.24-.57-.48-.5-.65-.5-.17-.01-.36-.01-.55-.01-.19 0-.51.07-.77.36-.26.29-1 .98-1 2.4 0 1.42 1.03 2.78 1.17 2.98.14.19 2.02 3.09 4.9 4.33.69.3 1.22.48 1.64.61.69.22 1.31.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM16.03 5C9.94 5 5 9.94 5 16.03c0 1.94.51 3.83 1.47 5.5L5 27l5.62-1.47a10.94 10.94 0 0 0 5.41 1.37c6.09 0 11.03-4.94 11.03-11.03S22.12 5 16.03 5z" />
        </svg>
      </a>

      <CourseModal
        course={openCourse}
        onClose={() => setOpenCourse(null)}
        whatsappLink={whatsappLink}
      />
    </div>
  );
}

function CourseCarousel({
  courses,
  onOpen,
}: {
  courses: Course[];
  onOpen: (course: Course) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const showArrows = courses.length > 4;

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {showArrows && (
        <button
          type="button"
          aria-label="Cursos anteriores"
          onClick={() => scroll(-1)}
          className="absolute -left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-elegant transition hover:bg-secondary md:-left-5"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="shrink-0 snap-start basis-[88%] sm:basis-[48%] lg:basis-[25%]"
          >
            <CourseCard course={course} onOpen={() => onOpen(course)} />
          </div>
        ))}
      </div>

      {showArrows && (
        <button
          type="button"
          aria-label="Próximos cursos"
          onClick={() => scroll(1)}
          className="absolute -right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-elegant transition hover:bg-secondary md:-right-5"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

function CourseCard({ course, onOpen }: { course: Course; onOpen: () => void }) {
  const Icon = course.icon;
  const pricing = getPricing(course.price);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-elegant">
      <div
        className="relative h-40 overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow">
          <Icon className="h-4 w-4" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-3 pb-2.5">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary">
            Diploma reconhecido
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Badge className="w-fit border border-cta/30 bg-cta/15 text-cta hover:bg-cta/15">
          {pricing.discountPercent}% de desconto
        </Badge>
        <Badge variant="secondary" className="mt-2 w-fit bg-brand/10 text-primary">
          {course.categoryLabel}
        </Badge>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug">{course.title}</h3>

        <div className="mt-auto border-t border-border pt-3">
          <div className="text-sm text-muted-foreground">
            De <span className="line-through">{pricing.original}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Por</div>
          <div className="font-display text-2xl font-bold text-primary">{course.price}</div>
          <div className="mt-1 text-xs text-muted-foreground">{pricing.installments}</div>
        </div>

        <div className="mt-4 flex flex-col">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant font-semibold h-11"
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
  const pricing = course ? getPricing(course.price) : null;

  return (
    <Dialog open={!!course} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        {course && (
          <>
            <DialogHeader className="border-b border-border bg-secondary/40 px-6 py-4">
              <DialogTitle className="font-display text-lg">Detalhes do Curso</DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
              <div
                className="relative flex aspect-square items-end overflow-hidden rounded-2xl bg-cover bg-center text-white"
                style={{ backgroundImage: `url(${course.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow">
                  <course.icon className="h-6 w-6" />
                </div>
                <div className="relative z-10 p-5">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                    Diploma reconhecido
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="font-display text-2xl font-bold leading-tight text-primary">
                  {course.title}
                </h2>
                <Badge variant="secondary" className="mt-3 w-fit bg-brand/10 text-primary">
                  {course.categoryLabel}
                </Badge>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Carga Horária
                    </div>
                    <div className="mt-1 font-display text-base font-bold">{course.workload}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Prazo
                    </div>
                    <div className="mt-1 font-display text-base font-bold">{course.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Modalidade
                    </div>
                    <div className="mt-1 font-display text-base font-bold">{course.modality}</div>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <Badge className="w-fit border border-cta/30 bg-cta/15 text-cta hover:bg-cta/15">
                    {pricing?.discountPercent}% de desconto
                  </Badge>
                  <div className="mt-2 text-sm text-muted-foreground">
                    De <span className="line-through">{pricing?.original}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Por</div>
                  <div className="font-display text-3xl font-extrabold text-primary">
                    {course.price}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{pricing?.installments}</div>
                </div>

                <a href={whatsappLink(course)} target="_blank" rel="noreferrer" className="mt-6">
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
