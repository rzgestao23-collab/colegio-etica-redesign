"use client";

import { useEffect, useRef, useState } from "react";

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
    galleryId: "galeria-infantil",
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
    galleryId: "galeria-fundamental",
    image: "/unidade-fundamental.jpg",
    alt: "Fachada da unidade de Ensino Fundamental do Colégio Ética",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const formationVideoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const section = document.querySelector<HTMLElement>("#formacao-integral");
    const video = formationVideoRef.current;
    if (!section || !video || prefersReducedMotion) return;

    let frame = 0;
    const syncVideoWithScroll = () => {
      frame = 0;
      const scrollRange = Math.max(section.offsetHeight - innerHeight, 1);
      const scrolledInSection = Math.min(Math.max(-section.getBoundingClientRect().top, 0), scrollRange);
      const progress = scrolledInSection / scrollRange;
      const duration = Number.isFinite(video.duration) ? video.duration : 10;
      const targetTime = duration * progress;

      section.style.setProperty("--formation-progress", `${progress}`);
      if (video.readyState < HTMLMediaElement.HAVE_METADATA) return;
      if (Math.abs(video.currentTime - targetTime) > 0.03) video.currentTime = targetTime;
    };
    const onScrollOrResize = () => {
      if (!frame) frame = requestAnimationFrame(syncVideoWithScroll);
    };

    video.addEventListener("loadedmetadata", syncVideoWithScroll);
    syncVideoWithScroll();
    addEventListener("scroll", onScrollOrResize, { passive: true });
    addEventListener("resize", onScrollOrResize);

    return () => {
      video.removeEventListener("loadedmetadata", syncVideoWithScroll);
      removeEventListener("scroll", onScrollOrResize);
      removeEventListener("resize", onScrollOrResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="announcement"><span>Matrículas 2027 abertas</span><a href="#matriculas">Agende uma visita <b aria-hidden="true">↗</b></a></div>
      <div className="scroll-progress" aria-hidden="true"><i /></div>

      <header className="topbar">
        <a href="#inicio" className="brand" aria-label="Colégio Ética São Carlos — início"><span className="brand-lockup brand-lockup--header"><img src="/colegio-etica-sao-carlos.png" alt="Colégio Ética São Carlos" /></span></a>
        <nav aria-label="Navegação principal"><a href="#colegio">O Colégio</a><a href="#proposta">Nossa proposta</a><a href="#ensino">Ensino</a><a href="#unidades">Unidades</a><a href="#matriculas">Matrículas</a></nav>
        <a className="portal-link" href="#area-do-aluno"><span aria-hidden="true">●</span> Área do aluno</a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      </header>

      {menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">
        {[["O Colégio", "#colegio"], ["Nossa proposta", "#proposta"], ["Ensino", "#ensino"], ["Unidades", "#unidades"], ["Matrículas", "#matriculas"]].map(([label, href], index) => <a href={href} key={href} onClick={closeMenu}><span>0{index + 1}</span>{label}<i aria-hidden="true">↗</i></a>)}
        <a className="mobile-portal" href="#area-do-aluno" onClick={closeMenu}>Área do aluno</a>
      </nav>}

      <section className="hero" id="inicio">
        <div className="hero-copy" id="conteudo" data-reveal>
          <p className="eyebrow"><i /> Educação Infantil e Ensino Fundamental</p>
          <h1>Conhecimento<br />que <em>conecta.</em></h1>
          <h2>Valores que transformam.</h2>
          <p className="intro">Uma escola feita de vínculos, descobertas e pessoas que aprendem juntas.</p>
          <div className="hero-actions"><a className="button primary" href="#matriculas">Agende uma visita <span aria-hidden="true">↗</span></a><a className="button secondary" href="#colegio">Conheça o Colégio <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-media">
          <img src="/hero-etica.jpg" alt="Alunos do Colégio Ética correndo juntos em um momento de convivência" />
          <div className="hero-objects" aria-hidden="true">
            <span className="object-cube">+</span>
          </div>
          <div className="hero-stamp"><strong>São Carlos</strong><span>conhecimento que conecta</span></div>
          <p className="hero-caption">A escola acontece quando cada criança participa.</p>
        </div>
        <div className="hero-bottom" aria-label="Etapas de ensino"><span>Educação Infantil</span><i /><span>Fundamental I</span><i /><span>Fundamental II</span></div>
      </section>

      <section className="welcome section-shell" id="colegio">
        <div className="section-kicker"><span>01</span><p>O Colégio</p></div>
        <div className="welcome-heading" data-reveal><h2>Uma escola que conhece cada aluno pelo <em>nome.</em></h2><p>O Colégio Ética São Carlos forma pessoas autônomas, criativas e responsáveis. Aqui, aprender é uma experiência compartilhada entre estudantes, educadores e famílias.</p></div>
        <div className="welcome-grid" data-reveal>
          <figure className="welcome-photo"><img src="/professora-aluna.jpg" alt="Professora acompanha uma aluna em atividade na sala de aula" loading="lazy" /><figcaption>Presença, escuta e cuidado no dia a dia.</figcaption></figure>
          <div className="welcome-manifesto"><blockquote>“Ensinar também é estar perto, perceber e criar espaço para cada descoberta.”</blockquote><div className="welcome-facts"><span><strong>2</strong> unidades em São Carlos</span><span><strong>3</strong> etapas de ensino</span><span><strong>1</strong> percurso de formação integral</span></div></div>
        </div>
      </section>

      <div className="values-ribbon" aria-label="Valores do Colégio Ética">
        <div><span>Curiosidade</span><i>●</i><span>Autonomia</span><i>●</i><span>Afeto</span><i>●</i><span>Conhecimento</span><i>●</i><span>Convivência</span><i>●</i><span>Curiosidade</span><i>●</i><span>Autonomia</span><i>●</i><span>Afeto</span><i>●</i><span>Conhecimento</span><i>●</i><span>Convivência</span><i>●</i></div>
      </div>

      <section className="proposal" id="proposta"><div className="section-shell">
        <div className="section-kicker light"><span>02</span><p>Nossa proposta</p></div>
        <div className="proposal-heading" data-reveal><h2>Cinco dimensões.<br /><em>Uma pessoa inteira.</em></h2><p>Nossa proposta sociointeracionista coloca o aluno no centro da construção do conhecimento, respeitando diferenças e incentivando potencialidades.</p></div>
        <div className="formation-scroll" id="formacao-integral">
          <div className="formation-sticky">
            <div className="formation-video-frame">
              <video ref={formationVideoRef} className="formation-video" muted playsInline preload="metadata" controls={prefersReducedMotion} aria-label="Animação das cinco dimensões da formação integral">
                <source src="/formacao-integral.mp4" type="video/mp4" />
                Seu navegador não suporta a animação em vídeo.
              </video>
              <div className="formation-video-caption"><span>Formação integral</span><p>{prefersReducedMotion ? "A animação está disponível para reprodução manual." : "Role para acompanhar a animação."}</p></div>
              <div className="formation-progress" aria-hidden="true"><i /></div>
            </div>
          </div>
          <div className="sr-only"><h3>As cinco dimensões da formação integral</h3><ul>{pillars.map((pillar) => <li key={pillar.number}><strong>{pillar.title}.</strong> {pillar.text}</li>)}</ul></div>
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
        <div className="unit-grid">{units.map((unit, index) => <article className={`unit-card unit-card--${index === 0 ? "infantil" : "fundamental"}`} data-reveal key={unit.title}><div className="unit-marker" aria-hidden="true"><span>{unit.label}</span><strong>0{index + 1}</strong></div><div className="unit-content"><span>{unit.label}</span><h3>{unit.title}</h3><address>{unit.address}<br />{unit.district}</address><div className="unit-actions"><a className="unit-gallery-link" href={`#${unit.galleryId}`}>Ver galeria da unidade <b aria-hidden="true">↓</b></a><a className="unit-contact-link" href={`https://wa.me/${unit.phoneHref}`} aria-label={`Falar com a unidade de ${unit.title} pelo WhatsApp`}>Falar pelo WhatsApp <b aria-hidden="true">↗</b></a></div></div></article>)}</div>
      </section>

      <section className="infrastructure" id="infraestrutura">
        <div className="section-shell">
          <div className="section-kicker"><span>05</span><p>Infraestrutura</p></div>
          <div className="infrastructure-heading" data-reveal><h2>Galeria das unidades.<br /><em>Um convite para visitar.</em></h2><p>Conheça uma prévia dos espaços de cada unidade e escolha o melhor caminho para falar com a nossa equipe.</p></div>
          <div className="gallery-grid">{units.map((unit) => <article className="gallery-card" id={unit.galleryId} data-reveal key={unit.galleryId}><figure><img src={unit.image} alt={unit.alt} loading="lazy" /></figure><div><span>{unit.label}</span><h3>{unit.title}</h3><p>{unit.address}<br />{unit.district}</p><a href={`https://wa.me/${unit.phoneHref}`} aria-label={`Falar com a unidade de ${unit.title} pelo WhatsApp`}>Fale com a unidade <b aria-hidden="true">↗</b></a></div></article>)}</div>
        </div>
      </section>

      <section className="life" id="vivencias">
        <div className="section-shell life-heading" data-reveal><div className="section-kicker light"><span>06</span><p>Vida no Ética</p></div><h2>A escola é feita de <em>gente.</em></h2><p>Relações verdadeiras, experiências significativas e alegria para aprender todos os dias.</p></div>
        <div className="photo-grid"><figure className="photo-large"><img src="/alunos-em-movimento.jpg" alt="Grupo de alunos do Colégio Ética em movimento" loading="lazy" /><figcaption>Convivência</figcaption></figure><figure><img src="/professor-aluno.jpg" alt="Professor conversa com aluno durante atividade" loading="lazy" /><figcaption>Vínculo</figcaption></figure><figure><img src="/professora-aluna.jpg" alt="Professora orienta aluna em atividade de sala" loading="lazy" /><figcaption>Aprendizagem</figcaption></figure></div>
      </section>

      <section className="student-area" id="area-do-aluno">
        <div className="section-shell">
          <div className="section-kicker"><span>07</span><p>Área do aluno</p></div>
          <div className="student-heading" data-reveal><h2>Um acesso para cada <em>momento.</em></h2><p>Encontre o canal certo para acompanhar a rotina escolar, os serviços da família e a experiência pedagógica.</p></div>
          <div className="access-grid">
            <article className="access-card" data-reveal><span>01</span><small>Celular</small><h3>Aplicativo</h3><p>Use o aplicativo indicado pela sua unidade para acompanhar a rotina pelo celular.</p><a href="#unidades">Escolher minha unidade <b aria-hidden="true">↓</b></a></article>
            <article className="access-card" data-reveal><span>02</span><small>Computador</small><h3>CPA</h3><p>Acesse os serviços escolares pelo navegador em um computador.</p><a href="https://colegioeticasaocarlos.com.br/aluno" target="_blank" rel="noreferrer">Acessar o CPA <b aria-hidden="true">↗</b></a></article>
            <article className="access-card" data-reveal><span>03</span><small>Aprendizagem</small><h3>Plurall</h3><p>Entre no ambiente pedagógico para continuar a experiência de aprendizagem.</p><a href="https://login.plurall.net/login" target="_blank" rel="noreferrer">Acessar o Plurall <b aria-hidden="true">↗</b></a></article>
          </div>
        </div>
      </section>

      <section className="enrollment" id="matriculas">
        <div className="enrollment-objects" aria-hidden="true"><span className="enroll-orbit" /><span className="enroll-pencil">✎</span><span className="enroll-star">✦</span></div>
        <div className="enrollment-copy" data-reveal><div className="section-kicker light"><span>08</span><p>Matrículas 2027</p></div><h2>Venha sentir o Ética <em>de perto.</em></h2><p>Converse com nossa equipe, conheça os espaços e encontre o percurso que faz sentido para sua família.</p></div>
        <div className="enrollment-actions"><a className="enrollment-choice light-choice" href="https://wa.me/5516997117269"><small>Educação Infantil</small><strong>Agendar uma visita</strong><span aria-hidden="true">↗</span></a><a className="enrollment-choice" href="https://wa.me/5516997615482"><small>Ensino Fundamental</small><strong>Agendar uma visita</strong><span aria-hidden="true">↗</span></a></div>
      </section>

      <footer>
        <div className="footer-main"><div className="footer-brand"><span className="brand-lockup brand-lockup--footer"><img src="/colegio-etica-sao-carlos.png" alt="Colégio Ética São Carlos" /></span><p>Conhecimento que conecta.<br />Valores que transformam.</p></div><div><span>Educação Infantil</span><p>Av. Dr. Teixeira de Barros, 779<br />Vila Prado · São Carlos</p><a href="tel:+5516997117269">16 99711-7269</a></div><div><span>Ensino Fundamental</span><p>Av. José Pereira Lopes, 990<br />Vila Prado · São Carlos</p><a href="tel:+5516997615482">16 99761-5482</a></div><div><span>Acessos rápidos</span><a href="#area-do-aluno">Área do aluno ↓</a><a href="#infraestrutura">Galeria das unidades ↓</a><a href="https://login.plurall.net/login" target="_blank" rel="noreferrer">Plurall ↗</a><a href="mailto:secretaria@colegioeticasaocarlos.com.br">E-mail ↗</a></div></div>
        <div className="footer-bottom"><p>© 2026 Colégio Ética São Carlos</p><div><a href="https://www.instagram.com/colegioetica_saocarlos/">Instagram</a><a href="https://pt-br.facebook.com/colegioeticasaocarlos/">Facebook</a><a href="https://www.youtube.com/channel/UC8YZPaEydi8tV9RbzqaU8jA">YouTube</a></div><a href="#inicio">Voltar ao topo ↑</a></div>
      </footer>
    </main>
  );
}
