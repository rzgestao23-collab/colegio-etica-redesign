"use client";

import { useEffect, useState } from "react";

const pillars = [
  { number: "01", title: "Social", text: "Aprender a conviver, colaborar e respeitar as diferenças." },
  { number: "02", title: "Emocional", text: "Reconhecer sentimentos e construir segurança para se expressar." },
  { number: "03", title: "Afetiva", text: "Criar vínculos verdadeiros entre escola, estudantes e famílias." },
  { number: "04", title: "Cognitiva", text: "Investigar, perguntar e transformar curiosidade em conhecimento." },
  { number: "05", title: "Motora", text: "Desenvolver o corpo por meio do movimento, da arte e do brincar." },
];

const stages = [
  { label: "Educação Infantil", detail: "Brincar, explorar e criar vínculos respeitando o tempo de cada criança." },
  { label: "Fundamental I", detail: "Bases sólidas em leitura, escrita e cálculo, com autonomia para aprender." },
  { label: "Fundamental II", detail: "Pensamento crítico, responsabilidade e protagonismo para novas escolhas." },
];

const units = [
  {
    label: "Unidade 01",
    title: "Educação Infantil",
    address: "Av. Dr. Teixeira de Barros, 779",
    district: "Vila Prado · São Carlos/SP",
    phone: "16 99711-7269",
    phoneHref: "5516997117269",
    image: "/unidade-infantil.jpg",
    alt: "Crianças e educadoras no parque da unidade de Educação Infantil do Colégio Ética",
  },
  {
    label: "Unidade 02",
    title: "Ensino Fundamental",
    address: "Av. José Pereira Lopes, 990",
    district: "Vila Prado · São Carlos/SP",
    phone: "16 99761-5482",
    phoneHref: "5516997615482",
    image: "/unidade-fundamental.jpg",
    alt: "Fachada da unidade de Ensino Fundamental do Colégio Ética",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.classList.toggle("menu-open", menuOpen);
    addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="announcement"><span>Matrículas 2027 abertas</span><a href="#matriculas">Agende uma visita <b aria-hidden="true">↗</b></a></div>

      <header className="topbar">
        <a href="#inicio" className="brand" aria-label="Colégio Ética São Carlos — início"><img src="/etica-institucional.png" alt="Colégio Ética São Carlos" /></a>
        <nav aria-label="Navegação principal"><a href="#colegio">O Colégio</a><a href="#proposta">Nossa proposta</a><a href="#ensino">Ensino</a><a href="#unidades">Unidades</a><a href="#matriculas">Matrículas</a></nav>
        <a className="portal-link" href="https://colegioeticasaocarlos.com.br/aluno"><span aria-hidden="true">●</span> Área do aluno</a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      </header>

      {menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">
        {[["O Colégio", "#colegio"], ["Nossa proposta", "#proposta"], ["Ensino", "#ensino"], ["Unidades", "#unidades"], ["Matrículas", "#matriculas"]].map(([label, href], index) => <a href={href} key={href} onClick={closeMenu}><span>0{index + 1}</span>{label}<i aria-hidden="true">↗</i></a>)}
        <a className="mobile-portal" href="https://colegioeticasaocarlos.com.br/aluno">Área do aluno</a>
      </nav>}

      <section className="hero" id="inicio">
        <div className="hero-copy" id="conteudo">
          <p className="eyebrow"><i /> Educação Infantil e Ensino Fundamental</p>
          <h1>Conhecimento<br />que <em>conecta.</em></h1>
          <h2>Valores que transformam.</h2>
          <p className="intro">Desde 1999, uma escola feita de vínculos, descobertas e pessoas que aprendem juntas.</p>
          <div className="hero-actions"><a className="button primary" href="#matriculas">Agende uma visita <span aria-hidden="true">↗</span></a><a className="button secondary" href="#colegio">Conheça o Ética <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-media">
          <img src="/hero-etica.jpg" alt="Alunos do Colégio Ética correndo juntos em um momento de convivência" />
          <div className="hero-stamp"><strong>1999</strong><span>educação que cresce junto</span></div>
          <p className="hero-caption">A escola acontece quando cada criança participa.</p>
        </div>
        <div className="hero-bottom" aria-label="Etapas de ensino"><span>Educação Infantil</span><i /><span>Fundamental I</span><i /><span>Fundamental II</span></div>
      </section>

      <section className="welcome section-shell" id="colegio">
        <div className="section-kicker"><span>01</span><p>O Colégio</p></div>
        <div className="welcome-heading"><h2>Uma escola que conhece cada aluno pelo <em>nome.</em></h2><p>O Ética nasceu para formar pessoas autônomas, criativas e responsáveis. Aqui, aprender é uma experiência compartilhada entre estudantes, educadores e famílias.</p></div>
        <div className="welcome-grid">
          <figure className="welcome-photo"><img src="/professora-aluna.jpg" alt="Professora acompanha uma aluna em atividade na sala de aula" loading="lazy" /><figcaption>Presença, escuta e cuidado no dia a dia.</figcaption></figure>
          <div className="welcome-manifesto"><blockquote>“Ensinar também é estar perto, perceber e criar espaço para cada descoberta.”</blockquote><div className="welcome-facts"><span><strong>1999</strong> ano de fundação</span><span><strong>2</strong> unidades em São Carlos</span><span><strong>1</strong> percurso de formação integral</span></div></div>
        </div>
      </section>

      <section className="proposal" id="proposta"><div className="section-shell">
        <div className="section-kicker light"><span>02</span><p>Nossa proposta</p></div>
        <div className="proposal-heading"><h2>Cinco dimensões.<br /><em>Uma pessoa inteira.</em></h2><p>Nossa proposta sociointeracionista coloca o aluno no centro da construção do conhecimento, respeitando diferenças e incentivando potencialidades.</p></div>
        <div className="pillar-grid">{pillars.map((pillar) => <article className="pillar-card" key={pillar.number}><span>{pillar.number}</span><h3>{pillar.title}</h3><p>{pillar.text}</p></article>)}</div>
      </div></section>

      <section className="learning" id="ensino">
        <div className="learning-photo"><img src="/aprender-fazendo.jpg" alt="Educadora acompanha um aluno em uma atividade pedagógica" loading="lazy" /><span>Aprender fazendo</span></div>
        <div className="learning-copy"><div className="section-kicker"><span>03</span><p>Ensino</p></div><h2>Cada fase tem seu próprio ritmo.</h2><p className="learning-intro">Da primeira descoberta às escolhas mais conscientes, o percurso acompanha novas perguntas, habilidades e formas de estar no mundo.</p><div className="stage-list">{stages.map((stage, index) => <article key={stage.label}><span>0{index + 1}</span><div><h3>{stage.label}</h3><p>{stage.detail}</p></div></article>)}</div></div>
      </section>

      <section className="units section-shell" id="unidades">
        <div className="section-kicker"><span>04</span><p>Nossas unidades</p></div>
        <div className="units-heading"><h2>Dois espaços.<br /><em>O mesmo cuidado.</em></h2><p>Ambientes pensados para acolher cada etapa, sempre perto das famílias de São Carlos.</p></div>
        <div className="unit-grid">{units.map((unit) => <article className="unit-card" key={unit.title}><div className="unit-image"><img src={unit.image} alt={unit.alt} loading="lazy" /></div><div className="unit-content"><span>{unit.label}</span><h3>{unit.title}</h3><address>{unit.address}<br />{unit.district}</address><a href={`https://wa.me/${unit.phoneHref}`} aria-label={`Falar com a unidade de ${unit.title} pelo WhatsApp`}>WhatsApp {unit.phone} <b aria-hidden="true">↗</b></a></div></article>)}</div>
      </section>

      <section className="life" id="vivencias">
        <div className="section-shell life-heading"><div className="section-kicker light"><span>05</span><p>Vida no Ética</p></div><h2>A escola é feita de <em>gente.</em></h2><p>Relações verdadeiras, experiências significativas e alegria para aprender todos os dias.</p></div>
        <div className="photo-grid"><figure className="photo-large"><img src="/alunos-em-movimento.jpg" alt="Grupo de alunos do Colégio Ética em movimento" loading="lazy" /><figcaption>Convivência</figcaption></figure><figure><img src="/professor-aluno.jpg" alt="Professor conversa com aluno durante atividade" loading="lazy" /><figcaption>Vínculo</figcaption></figure><figure><img src="/professora-aluna.jpg" alt="Professora orienta aluna em atividade de sala" loading="lazy" /><figcaption>Aprendizagem</figcaption></figure></div>
      </section>

      <section className="enrollment" id="matriculas">
        <div className="enrollment-copy"><div className="section-kicker light"><span>06</span><p>Matrículas 2027</p></div><h2>Venha sentir o Ética <em>de perto.</em></h2><p>Converse com nossa equipe, conheça os espaços e encontre o percurso que faz sentido para sua família.</p></div>
        <div className="enrollment-actions"><a className="enrollment-choice light-choice" href="https://wa.me/5516997117269"><small>Educação Infantil</small><strong>Agendar uma visita</strong><span aria-hidden="true">↗</span></a><a className="enrollment-choice" href="https://wa.me/5516997615482"><small>Ensino Fundamental</small><strong>Agendar uma visita</strong><span aria-hidden="true">↗</span></a></div>
      </section>

      <footer>
        <div className="footer-main"><div className="footer-brand"><img src="/etica-institucional.png" alt="Colégio Ética São Carlos" /><p>Conhecimento que conecta.<br />Valores que transformam.</p></div><div><span>Educação Infantil</span><p>Av. Dr. Teixeira de Barros, 779<br />Vila Prado · São Carlos</p><a href="tel:+5516997117269">16 99711-7269</a></div><div><span>Ensino Fundamental</span><p>Av. José Pereira Lopes, 990<br />Vila Prado · São Carlos</p><a href="tel:+5516997615482">16 99761-5482</a></div><div><span>Acessos rápidos</span><a href="https://colegioeticasaocarlos.com.br/aluno">Área do aluno ↗</a><a href="https://login.plurall.net/login">Plurall ↗</a><a href="mailto:secretaria@colegioeticasaocarlos.com.br">E-mail ↗</a></div></div>
        <div className="footer-bottom"><p>© 2026 Colégio Ética São Carlos</p><div><a href="https://www.instagram.com/colegioetica_saocarlos/">Instagram</a><a href="https://pt-br.facebook.com/colegioeticasaocarlos/">Facebook</a><a href="https://www.youtube.com/channel/UC8YZPaEydi8tV9RbzqaU8jA">YouTube</a></div><a href="#inicio">Voltar ao topo ↑</a></div>
      </footer>
    </main>
  );
}
