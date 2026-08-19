"use client";

import { useEffect, useState } from "react";
import EthicaScene from "../components/EthicaScene";

const pillars = [
  { key: "social", label: "Social", number: "01", title: "Aprender a conviver", text: "Colaboração, respeito às diferenças e participação ativa na vida em comunidade.", color: "lime" },
  { key: "emocional", label: "Emocional", number: "02", title: "Reconhecer a si mesmo", text: "Autonomia, autoestima e segurança para expressar ideias, dúvidas e sentimentos.", color: "white" },
  { key: "afetiva", label: "Afetiva", number: "03", title: "Criar vínculos reais", text: "Acolhimento e diálogo transparente entre estudantes, educadores e famílias.", color: "peach" },
  { key: "cognitiva", label: "Cognitiva", number: "04", title: "Construir conhecimento", text: "Leitura, escrita, cálculo, investigação e liberdade para criar novos saberes.", color: "yellow" },
  { key: "motora", label: "Motora", number: "05", title: "Descobrir em movimento", text: "Atividades físicas, artísticas e experiências práticas integradas ao desenvolvimento.", color: "aqua" },
];

const segments = [
  { number: "01", tag: "Primeiras descobertas", title: "Educação Infantil", age: "Infância em movimento", text: "Brincar, investigar e criar vínculos em um ambiente que respeita o tempo e a singularidade de cada criança.", skin: "segment-orange" },
  { number: "02", tag: "Novas conexões", title: "Fundamental I", age: "Autonomia para aprender", text: "Bases sólidas em leitura, escrita e cálculo, conectadas à curiosidade, à expressão e à convivência.", skin: "segment-lime" },
  { number: "03", tag: "Mundo em expansão", title: "Fundamental II", age: "Pensamento e responsabilidade", text: "Conhecimento aprofundado, pensamento crítico e protagonismo para fazer escolhas conscientes.", skin: "segment-blue" },
];

const spaces = ["Biblioteca", "Laboratório de Ciências", "Tecnologia", "Quadra", "Piscina", "Parque", "Refeitório"];

export default function Home() {
  const [activePillar, setActivePillar] = useState("social");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const chooseFromScene = (event: Event) => choosePillar((event as CustomEvent<string>).detail);
    const onScroll = () => {
      const progress = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      document.documentElement.style.setProperty("--page-progress", progress.toString());
    };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
    }, { threshold: .12 });
    document.querySelectorAll(".reveal-on-scroll").forEach(element => revealObserver.observe(element));
    addEventListener("etica-pillar-selected", chooseFromScene);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      removeEventListener("etica-pillar-selected", chooseFromScene);
      removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
    };
  }, []);

  const choosePillar = (key: string) => {
    setActivePillar(key);
    window.dispatchEvent(new CustomEvent("etica-pillar", { detail: key }));
  };

  const active = pillars.find(pillar => pillar.key === activePillar) || pillars[0];

  return (
    <main>
      <div className="progress" aria-hidden="true" />
      <div className="announcement">
        <span>Matrículas 2027 abertas</span>
        <a href="https://colegioeticasaocarlos.com.br/contato">Agende uma visita <b>↗</b></a>
      </div>
      <header className="topbar">
        <a href="#inicio" className="brand" aria-label="Colégio Ética São Carlos — início">
          <img src="/etica-logo.png" alt="Colégio Ética São Carlos" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#colegio">O Colégio</a>
          <a href="#proposta">Proposta pedagógica</a>
          <a href="#segmentos">Segmentos</a>
          <a href="#espacos">Espaços</a>
          <a href="#matriculas">Matrículas</a>
        </nav>
        <a className="portal-link" href="https://colegioeticasaocarlos.com.br/aluno"><span>●</span> Área do aluno</a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      </header>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        {[["O Colégio","#colegio"],["Proposta","#proposta"],["Segmentos","#segmentos"],["Espaços","#espacos"],["Matrículas","#matriculas"]].map(([label,href], index) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}<i>↗</i></a>
        ))}
        <a className="mobile-portal" href="https://colegioeticasaocarlos.com.br/aluno">Área do aluno</a>
      </div>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><i /> Educação Infantil e Ensino Fundamental</p>
          <h1>Conhecimento<br />que <em>conecta.</em></h1>
          <h2>Valores que transformam.</h2>
          <p className="intro">Uma educação que forma pessoas autônomas, criativas e responsáveis — com o aluno no centro de cada descoberta.</p>
          <div className="hero-actions">
            <a className="button primary" href="https://colegioeticasaocarlos.com.br/contato">Agende uma visita <span>↗</span></a>
            <a className="button secondary" href="#proposta">Conheça nossa proposta <span>↓</span></a>
          </div>
        </div>

        <div className="hero-stage" aria-label="Escultura tridimensional interativa sobre formação integral">
          <div className="stage-grid" />
          <EthicaScene />
          <div className="scene-reticle"><i /><i /><i /><i /></div>
          <div className="pillar-dots" role="group" aria-label="Dimensões da formação integral">
            {pillars.map(pillar => <button type="button" key={pillar.key} onClick={() => choosePillar(pillar.key)} className={activePillar === pillar.key ? "active" : ""} aria-label={`Selecionar dimensão ${pillar.label}`}><span />{pillar.label}</button>)}
          </div>
          <p className="stage-caption"><span>01</span> Toque nos módulos e descubra</p>
        </div>

        <div className="hero-bottom" id="segmentos-atalho">
          <a href="#infantil"><span>01</span><b>Educação Infantil</b><i>↗</i></a>
          <a href="#fundamental1"><span>02</span><b>Fundamental I</b><i>↗</i></a>
          <a href="#fundamental2"><span>03</span><b>Fundamental II</b><i>↗</i></a>
        </div>
      </section>

      <section className="manifesto" id="colegio">
        <div className="section-label reveal-on-scroll"><span>02</span><p>O Colégio</p><p>São Carlos · desde 1999</p></div>
        <h2 className="reveal-on-scroll">Quando a criança participa, pergunta e experimenta, o conhecimento deixa de ser resposta e vira <em>descoberta.</em></h2>
        <div className="manifesto-lower reveal-on-scroll">
          <div className="manifesto-image"><img src="/etica-equipe.jpeg" alt="Cadernos e materiais sobre uma mesa em um espaço do Colégio Ética" /><span>O fazer em primeiro plano</span></div>
          <div className="manifesto-copy"><p>Nossa proposta sociointeracionista entende cada aluno como um ser social, histórico e ativo na construção do conhecimento.</p><a href="#proposta">Ler nossa proposta <span>↗</span></a></div>
          <div className="since"><strong>1999</strong><span>Uma história construída com famílias de São Carlos.</span></div>
        </div>
      </section>

      <section className="formation" id="proposta">
        <div className="formation-heading reveal-on-scroll">
          <div className="section-label light"><span>03</span><p>Formação integral</p></div>
          <h2>Cinco dimensões.<br /><em>Uma pessoa inteira.</em></h2>
          <p>Escolha uma dimensão e veja como ela participa do desenvolvimento de cada estudante.</p>
        </div>
        <div className="formation-interface reveal-on-scroll">
          <div className="pillar-list" role="tablist" aria-label="Dimensões da formação integral">
            {pillars.map(pillar => (
              <button role="tab" aria-selected={activePillar === pillar.key} className={`${pillar.color} ${activePillar === pillar.key ? "active" : ""}`} onClick={() => choosePillar(pillar.key)} key={pillar.key} type="button">
                <span>{pillar.number}</span><b>{pillar.label}</b><i>↗</i>
              </button>
            ))}
          </div>
          <div className={`pillar-content ${active.color}`} role="tabpanel">
            <span>{active.number} / 05</span><h3>{active.title}</h3><p>{active.text}</p><div className="content-shape"><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className="segments" id="segmentos">
        <div className="segments-heading reveal-on-scroll">
          <div className="section-label"><span>04</span><p>Segmentos</p></div>
          <h2>Cada fase tem<br />seu próprio ritmo.</h2>
          <p>Um percurso contínuo que acompanha novas perguntas, habilidades e formas de estar no mundo.</p>
        </div>
        <div className="segment-grid">
          {segments.map((segment, index) => (
            <article className={`segment-card ${segment.skin} reveal-on-scroll`} id={index === 0 ? "infantil" : index === 1 ? "fundamental1" : "fundamental2"} key={segment.title}>
              <div className="segment-top"><span>{segment.number}</span><p>{segment.tag}</p><i>↗</i></div>
              <div className="segment-art"><i /><i /><i /><b /></div>
              <div><small>{segment.age}</small><h3>{segment.title}</h3><p>{segment.text}</p></div>
              <a href="https://colegioeticasaocarlos.com.br/contato">Conhecer o segmento <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="method">
        <div className="method-copy reveal-on-scroll">
          <div className="section-label"><span>05</span><p>Como aprendemos</p></div>
          <h2>Aprender é<br />uma relação.</h2>
          <p>O conhecimento ganha sentido quando estudante, educador, família e comunidade constroem juntos.</p>
          <a className="text-link" href="https://colegioeticasaocarlos.com.br/aescola/metodologia-e-proposta-pedagogica">Conheça a metodologia <span>↗</span></a>
        </div>
        <div className="method-system reveal-on-scroll" aria-label="Aluno, escola e família conectados">
          <div className="system-grid" />
          <div className="system-orbit orbit-a"><span>ESCOLA</span></div>
          <div className="system-orbit orbit-b"><span>FAMÍLIA</span></div>
          <div className="system-orbit orbit-c"><span>COMUNIDADE</span></div>
          <div className="system-core"><small>no centro</small><strong>ALUNO</strong></div>
        </div>
      </section>

      <section className="spaces" id="espacos">
        <div className="spaces-copy reveal-on-scroll">
          <div className="section-label light"><span>06</span><p>Espaços que ensinam</p></div>
          <h2>A escola também<br />é uma educadora.</h2>
          <p>Ambientes para pesquisar, movimentar, criar, conviver e transformar curiosidade em experiência.</p>
          <div className="space-list">{spaces.map((space,index) => <span key={space}><i>0{index + 1}</i>{space}</span>)}</div>
        </div>
        <div className="campus-map reveal-on-scroll" aria-label="Mapa conceitual dos espaços do colégio">
          <div className="map-floor" />
          <div className="building building-a"><span>Unidade Infantil</span><i /><i /><i /></div>
          <div className="building building-b"><span>Ensino Fundamental</span><i /><i /><i /><i /></div>
          <div className="court"><span>Quadra</span></div>
          <div className="pool"><span>Piscina</span></div>
          <div className="tree tree-a" /><div className="tree tree-b" /><div className="tree tree-c" />
          <p>Mapa conceitual · visite para conhecer</p>
        </div>
      </section>

      <section className="values">
        <div className="section-label reveal-on-scroll"><span>07</span><p>Valores em prática</p><p>Mais que palavras</p></div>
        <div className="value-marquee"><div>ÉTICA · AUTONOMIA · CRIATIVIDADE · RESPONSABILIDADE · DIÁLOGO · RESPEITO ·&nbsp;</div><div aria-hidden="true">ÉTICA · AUTONOMIA · CRIATIVIDADE · RESPONSABILIDADE · DIÁLOGO · RESPEITO ·&nbsp;</div></div>
        <blockquote className="reveal-on-scroll">“Formar para o conhecimento sem perder a capacidade de criar novos saberes.”</blockquote>
      </section>

      <section className="enrollment" id="matriculas">
        <div className="enrollment-shape"><i /><i /><i /></div>
        <div className="section-label light"><span>08</span><p>Próximo passo</p><p>Matrículas 2027</p></div>
        <h2 className="reveal-on-scroll">Venha conhecer<br />o Ética <em>de perto.</em></h2>
        <div className="enrollment-bottom reveal-on-scroll">
          <p>Converse com nossa equipe, visite os espaços e descubra qual percurso faz sentido para sua família.</p>
          <div><a className="button light-button" href="https://colegioeticasaocarlos.com.br/contato">Agendar uma visita <span>↗</span></a><a className="button outline-light" href="https://wa.me/5516997615482">Falar no WhatsApp <span>↗</span></a></div>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div><img src="/etica-logo.png" alt="Colégio Ética São Carlos" /><p>Conhecimento que conecta.<br />Valores que transformam.</p></div>
          <div><span>Unidade Infantil</span><p>Av. Dr. Teixeira de Barros, 779<br />Vila Prado · São Carlos</p><a href="tel:+5516997117269">16 99711-7269</a></div>
          <div><span>Ensino Fundamental</span><p>Av. José Pereira Lopes, 990<br />Vila Prado · São Carlos</p><a href="tel:+5516997615482">16 99761-5482</a></div>
          <div><span>Acessos rápidos</span><a href="https://colegioeticasaocarlos.com.br/aluno">Área do aluno ↗</a><a href="https://login.plurall.net/login">Plurall ↗</a><a href="https://colegioeticasaocarlos.com.br/contato">Contato ↗</a></div>
        </div>
        <div className="footer-bottom"><p>© 2026 COLÉGIO ÉTICA SÃO CARLOS</p><div><a href="https://www.instagram.com/colegioetica_saocarlos/">Instagram</a><a href="https://pt-br.facebook.com/colegioeticasaocarlos/">Facebook</a><a href="https://www.youtube.com/channel/UC8YZPaEydi8tV9RbzqaU8jA">YouTube</a></div><a href="#inicio">Voltar ao topo ↑</a></div>
      </footer>
    </main>
  );
}
