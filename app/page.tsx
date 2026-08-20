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
  const [activePillar, setActivePillar] = useState(0);

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

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const available = document.documentElement.scrollHeight - innerHeight;
      const progress = available > 0 ? scrollY / available : 0;
      root.style.setProperty("--page-progress", `${Math.min(1, Math.max(0, progress))}`);

      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-pillar-index]"));
      if (cards.length) {
        const focusLine = innerHeight * 0.5;
        const closest = cards.reduce((best, card, index) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - focusLine);
          return distance < best.distance ? { index, distance } : best;
        }, { index: 0, distance: Number.POSITIVE_INFINITY });
        setActivePillar((current) => current === closest.index ? current : closest.index);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

    reveals.forEach((element) => reducedMotion ? element.classList.add("is-visible") : revealObserver.observe(element));
    root.classList.add("motion-ready");
    updateProgress();
    addEventListener("scroll", onScroll, { passive: true });

    return () => {
      root.classList.remove("motion-ready");
      root.style.removeProperty("--page-progress");
      removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="announcement"><span>Matrículas 2027 abertas</span><a href="#matriculas">Agende uma visita <b aria-hidden="true">↗</b></a></div>
      <div className="scroll-progress" aria-hidden="true"><i /></div>

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
        <div className="hero-copy" id="conteudo" data-reveal>
          <p className="eyebrow"><i /> Educação Infantil e Ensino Fundamental</p>
          <h1>Conhecimento<br />que <em>conecta.</em></h1>
          <h2>Valores que transformam.</h2>
          <p className="intro">Desde 1999, uma escola feita de vínculos, descobertas e pessoas que aprendem juntas.</p>
          <div className="hero-actions"><a className="button primary" href="#matriculas">Agende uma visita <span aria-hidden="true">↗</span></a><a className="button secondary" href="#colegio">Conheça o Ética <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-media">
          <img src="/hero-etica.jpg" alt="Alunos do Colégio Ética correndo juntos em um momento de convivência" />
          <div className="hero-objects" aria-hidden="true">
            <div className="book-object"><span className="book-cover">É</span><span className="book-pages" /></div>
            <span className="object-sphere">?</span>
            <span className="object-cube">+</span>
          </div>
          <div className="hero-stamp"><strong>1999</strong><span>educação que cresce junto</span></div>
          <p className="hero-caption">A escola acontece quando cada criança participa.</p>
        </div>
        <div className="hero-bottom" aria-label="Etapas de ensino"><span>Educação Infantil</span><i /><span>Fundamental I</span><i /><span>Fundamental II</span></div>
      </section>

      <section className="welcome section-shell" id="colegio">
        <div className="section-kicker"><span>01</span><p>O Colégio</p></div>
        <div className="welcome-heading" data-reveal><h2>Uma escola que conhece cada aluno pelo <em>nome.</em></h2><p>O Ética nasceu para formar pessoas autônomas, criativas e responsáveis. Aqui, aprender é uma experiência compartilhada entre estudantes, educadores e famílias.</p></div>
        <div className="welcome-grid" data-reveal>
          <figure className="welcome-photo"><img src="/professora-aluna.jpg" alt="Professora acompanha uma aluna em atividade na sala de aula" loading="lazy" /><figcaption>Presença, escuta e cuidado no dia a dia.</figcaption></figure>
          <div className="welcome-manifesto"><blockquote>“Ensinar também é estar perto, perceber e criar espaço para cada descoberta.”</blockquote><div className="welcome-facts"><span><strong>1999</strong> ano de fundação</span><span><strong>2</strong> unidades em São Carlos</span><span><strong>1</strong> percurso de formação integral</span></div></div>
        </div>
      </section>

      <div className="values-ribbon" aria-label="Valores do Colégio Ética">
        <div><span>Curiosidade</span><i>●</i><span>Autonomia</span><i>●</i><span>Afeto</span><i>●</i><span>Conhecimento</span><i>●</i><span>Convivência</span><i>●</i><span>Curiosidade</span><i>●</i><span>Autonomia</span><i>●</i><span>Afeto</span><i>●</i><span>Conhecimento</span><i>●</i><span>Convivência</span><i>●</i></div>
      </div>

      <section className="proposal" id="proposta"><div className="section-shell">
        <div className="section-kicker light"><span>02</span><p>Nossa proposta</p></div>
        <div className="proposal-heading" data-reveal><h2>Cinco dimensões.<br /><em>Uma pessoa inteira.</em></h2><p>Nossa proposta sociointeracionista coloca o aluno no centro da construção do conhecimento, respeitando diferenças e incentivando potencialidades.</p></div>
        <div className="proposal-story">
          <div className="dimension-stage" aria-hidden="true">
            <div className={`dimension-sculpture active-${activePillar + 1}`}>
              <span className="dimension-ring ring-one" />
              <span className="dimension-ring ring-two" />
              <span className="dimension-core"><b>Ética</b><small>formação integral</small></span>
              {pillars.map((pillar, index) => <span className={`dimension-node node-${index + 1}${activePillar === index ? " is-active" : ""}`} key={pillar.number}>{pillar.number}</span>)}
            </div>
            <p><span>Role para explorar</span><i>↓</i></p>
          </div>
          <div className="pillar-stack">{pillars.map((pillar, index) => <article className={`pillar-card${activePillar === index ? " is-active" : ""}`} data-pillar-index={index} data-reveal key={pillar.number}><span>{pillar.number}</span><h3>{pillar.title}</h3><p>{pillar.text}</p><i aria-hidden="true">{index === 0 ? "◎" : index === 1 ? "◇" : index === 2 ? "♡" : index === 3 ? "✦" : "↗"}</i></article>)}</div>
        </div>
        <a className="proposal-exit" href="#ensino"><span>Próximo capítulo</span><strong>Conheça as etapas de ensino</strong><i aria-hidden="true">↓</i></a>
      </div></section>

      <section className="learning" id="ensino">
        <div className="learning-photo"><img src="/aprender-fazendo.jpg" alt="Educadora acompanha um aluno em uma atividade pedagógica" loading="lazy" /><span>Aprender fazendo</span></div>
        <div className="learning-copy" data-reveal><div className="section-kicker"><span>03</span><p>Ensino</p></div><h2>Cada fase tem seu próprio ritmo.</h2><p className="learning-intro">Da primeira descoberta às escolhas mais conscientes, o percurso acompanha novas perguntas, habilidades e formas de estar no mundo.</p><div className="stage-list">{stages.map((stage, index) => <article key={stage.label}><span>0{index + 1}</span><div><h3>{stage.label}</h3><p>{stage.detail}</p></div></article>)}</div></div>
      </section>

      <section className="units section-shell" id="unidades">
        <div className="section-kicker"><span>04</span><p>Nossas unidades</p></div>
        <div className="units-heading" data-reveal><h2>Dois espaços.<br /><em>O mesmo cuidado.</em></h2><p>Ambientes pensados para acolher cada etapa, sempre perto das famílias de São Carlos.</p></div>
        <div className="unit-grid">{units.map((unit) => <article className="unit-card" data-reveal key={unit.title}><div className="unit-image"><img src={unit.image} alt={unit.alt} loading="lazy" /></div><div className="unit-content"><span>{unit.label}</span><h3>{unit.title}</h3><address>{unit.address}<br />{unit.district}</address><a href={`https://wa.me/${unit.phoneHref}`} aria-label={`Falar com a unidade de ${unit.title} pelo WhatsApp`}>WhatsApp {unit.phone} <b aria-hidden="true">↗</b></a></div></article>)}</div>
      </section>

      <section className="life" id="vivencias">
        <div className="section-shell life-heading" data-reveal><div className="section-kicker light"><span>05</span><p>Vida no Ética</p></div><h2>A escola é feita de <em>gente.</em></h2><p>Relações verdadeiras, experiências significativas e alegria para aprender todos os dias.</p></div>
        <div className="photo-grid"><figure className="photo-large"><img src="/alunos-em-movimento.jpg" alt="Grupo de alunos do Colégio Ética em movimento" loading="lazy" /><figcaption>Convivência</figcaption></figure><figure><img src="/professor-aluno.jpg" alt="Professor conversa com aluno durante atividade" loading="lazy" /><figcaption>Vínculo</figcaption></figure><figure><img src="/professora-aluna.jpg" alt="Professora orienta aluna em atividade de sala" loading="lazy" /><figcaption>Aprendizagem</figcaption></figure></div>
      </section>

      <section className="enrollment" id="matriculas">
        <div className="enrollment-objects" aria-hidden="true"><span className="enroll-orbit" /><span className="enroll-pencil">✎</span><span className="enroll-star">✦</span></div>
        <div className="enrollment-copy" data-reveal><div className="section-kicker light"><span>06</span><p>Matrículas 2027</p></div><h2>Venha sentir o Ética <em>de perto.</em></h2><p>Converse com nossa equipe, conheça os espaços e encontre o percurso que faz sentido para sua família.</p></div>
        <div className="enrollment-actions"><a className="enrollment-choice light-choice" href="https://wa.me/5516997117269"><small>Educação Infantil</small><strong>Agendar uma visita</strong><span aria-hidden="true">↗</span></a><a className="enrollment-choice" href="https://wa.me/5516997615482"><small>Ensino Fundamental</small><strong>Agendar uma visita</strong><span aria-hidden="true">↗</span></a></div>
      </section>

      <footer>
        <div className="footer-main"><div className="footer-brand"><img src="/etica-institucional.png" alt="Colégio Ética São Carlos" /><p>Conhecimento que conecta.<br />Valores que transformam.</p></div><div><span>Educação Infantil</span><p>Av. Dr. Teixeira de Barros, 779<br />Vila Prado · São Carlos</p><a href="tel:+5516997117269">16 99711-7269</a></div><div><span>Ensino Fundamental</span><p>Av. José Pereira Lopes, 990<br />Vila Prado · São Carlos</p><a href="tel:+5516997615482">16 99761-5482</a></div><div><span>Acessos rápidos</span><a href="https://colegioeticasaocarlos.com.br/aluno">Área do aluno ↗</a><a href="https://login.plurall.net/login">Plurall ↗</a><a href="mailto:secretaria@colegioeticasaocarlos.com.br">E-mail ↗</a></div></div>
        <div className="footer-bottom"><p>© 2026 Colégio Ética São Carlos</p><div><a href="https://www.instagram.com/colegioetica_saocarlos/">Instagram</a><a href="https://pt-br.facebook.com/colegioeticasaocarlos/">Facebook</a><a href="https://www.youtube.com/channel/UC8YZPaEydi8tV9RbzqaU8jA">YouTube</a></div><a href="#inicio">Voltar ao topo ↑</a></div>
      </footer>
    </main>
  );
}
