/* ============ CONFIGURAÇÃO — ajuste ao publicar ============ */
const CONFIG = {
  // Envio dos cadastros para a caixa de entrada da PrimeCorp.
  // FormSubmit exige ATIVAÇÃO ÚNICA: faça um envio de teste e clique
  // no link de confirmação que chega em contato@.
  formEndpoint: "https://formsubmit.co/ajax/contato@primecorpconsultoria.com.br",
  emailDestino: "contato@primecorpconsultoria.com.br",
  emailCopia:   "comercial@primecorpconsultoria.com.br",
  whatsapp: "5519981105192",
  instagram: "https://www.instagram.com/primecorpbrokers",
  facebook: "https://www.facebook.com/share/17YSMb41ng/",

  /* ===== TRÁFEGO PAGO =====
     Cole o ID do Pixel da Meta (Gerenciador de Eventos → Fontes de dados).
     Enquanto estiver vazio, nenhum cookie de rastreamento é carregado. */
  metaPixelId: "",
  googleAdsId: ""      // opcional: AW-XXXXXXXXX
};

/* ============ MATÉRIAS EXIBIDAS NO SITE ============
   Conteúdo institucional. Nenhum valor é calculado ou exibido:
   o levantamento é preparado caso a caso pela equipe.            */
const MAT_PUB=[
 {k:'ISSQN',sig:'Imposto sobre serviços de qualquer natureza',via:'Administrativo',
  prazo:'6 a 18 meses, em módulos',modo:'Depósitos em conta informada pelo ente',
  desc:'Uso de inteligência artificial para identificar fatos geradores e contribuintes não conhecidos da área de arrecadação, fornecendo dados e documentos para a cobrança dos impostos não arrecadados.'},
 {k:'FPM / FPE',sig:'Fundo de participação dos municípios e estados',via:'Judicial',
  prazo:'3 a 4 anos · ação em até 30 dias',modo:'Precatório',
  desc:'Percentual da arrecadação de tributos federais destinado ao ente. Recuperação de valores repassados a menor por precatórios, compensações ou restituições, com cálculos detalhados e respaldo jurídico.'},
 {k:'Imposto de Renda',sig:'IR retido na fonte',via:'Judicial',
  prazo:'apuração em 30 dias · até 2 anos',modo:'Depósito em conta ou precatório',
  desc:'Identificação e apuração do imposto de renda que o ente poderia ter retido na fonte e do qual é titular, com protocolização de requerimento de devolução à Receita Federal.'},
 {k:'PASEP',sig:'Programa de formação do patrimônio do servidor público',via:'Judicial',
  prazo:'apuração em 30 dias · até 2 anos',modo:'Depósito em conta ou precatório',
  desc:'Correção de valores pagos indevidamente ou a maior, garantindo a devolução aos cofres públicos por requerimento administrativo ou ação.'},
 {k:'RAT-FAP',sig:'Riscos ambientais do trabalho e fator acidentário',via:'Administrativo',
  prazo:'60 dias após a ordem de serviço',modo:'Compensação mensal via PER/DCOMP',
  desc:'Apuração da atividade preponderante e reenquadramento nos índices corretos de RAT e FAP, com recuperação de valores pagos a maior sobre o salário-maternidade.'},
 {k:'FGTS / Depósitos recursais',sig:'Fundo de garantia e depósitos recursais',via:'Administrativo',
  prazo:'180 dias após a ordem de serviço',modo:'Restituição em conta informada pelo ente',
  desc:'Recuperação de depósitos recursais e de FGTS de não optantes pertencentes ao ente, com revisão de depósitos pendentes ou calculados erroneamente.'}
];

const MAT_PJ=[
 ['Exclusão do ICMS da base do PIS/COFINS','Tema 69/STF — a "tese do século"','p-pac','Pacificada','O ICMS não compõe a base de cálculo do PIS e da COFINS por não representar faturamento. Recuperação dos últimos 5 anos e ajuste do recolhimento corrente.'],
 ['Exclusão do ICMS-ST da base do PIS/COFINS','Tema 1.125/STJ','p-pac','Pacificada','Aplicação do mesmo racional ao ICMS recolhido por substituição tributária, em favor do contribuinte substituído.'],
 ['Créditos de PIS/COFINS sobre insumos','Tema 779/780 STJ — essencialidade','p-pac','Pacificada','Revisão do aproveitamento de créditos no regime não cumulativo pelo critério de essencialidade e relevância, com recuperação retroativa.'],
 ['Contribuição previdenciária sobre verbas indenizatórias','Salário-maternidade, aviso prévio e afins','p-adm','Administrativo','Verbas de natureza indenizatória não integram a base da contribuição patronal. Revisão da folha dos últimos 5 anos e correção do recolhimento futuro.'],
 ['RAT-FAP','Reenquadramento de alíquota','p-adm','Administrativo','Apuração da atividade preponderante por estabelecimento e revisão do FAP conforme os registros de acidentes e afastamentos.'],
 ['FGTS e depósitos recursais','Revisão de depósitos','p-adm','Administrativo','Levantamento de depósitos recursais retidos e de FGTS calculado erroneamente, com recuperação dos valores pendentes.'],
 ['Créditos acumulados e saldo credor de ICMS','Ressarcimento e transferência','p-adm','Administrativo','Habilitação, homologação e monetização de créditos acumulados, incluindo ressarcimento de ICMS-ST.'],
 ['Pagamentos indevidos e compensação','PER/DCOMP','p-adm','Administrativo','Auditoria retroativa de 5 anos sobre tributos federais recolhidos a maior, com restituição ou compensação com débitos próprios.'],
 ['Revisão de IRPJ e CSLL','Lucro real e presumido','p-amb','Adm. e judicial','Revisão da apuração, tratamento de subvenções e benefícios fiscais e correção de bases que geraram recolhimento a maior.']
];

/* ============ UTILITÁRIOS ============ */
const nf=n=>n.toLocaleString('pt-BR');
const val=id=>(document.getElementById(id)?.value||'').trim();
function toast(m,t){const d=document.createElement('div');d.className='toast'+(t?' '+t:'');d.textContent=m;
  document.getElementById('toasts').appendChild(d);setTimeout(()=>d.remove(),4600)}
function menuTog(){
  const m=document.getElementById('menu');
  const aberto=m.classList.toggle('open');
  document.body.style.overflow=aberto?'hidden':'';
  document.getElementById('topo').classList.toggle('solid',aberto||scrollY>40);
  /* o botão anuncia o próprio estado a quem usa leitor de tela */
  const b=document.querySelector('.burger');
  if(b){b.setAttribute('aria-expanded',aberto?'true':'false');
        b.setAttribute('aria-label',aberto?'Fechar menu':'Abrir menu')}
}
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>{
  document.getElementById('menu').classList.remove('open');document.body.style.overflow='';
  const b=document.querySelector('.burger');
  if(b){b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Abrir menu')}}));

/* ============ BARRA DO TOPO ============
   O site agora tem paginas de verdade: cada assunto no seu endereco.
   A barra so muda de aparencia conforme a rolagem.                   */
function naHome(){return !document.getElementById('site').classList.contains('interna')}
let barraSolida=null;
function animarMarca(){
  const b=document.querySelector('.brand'); if(!b)return;
  b.classList.remove('marca-viva'); void b.offsetWidth; b.classList.add('marca-viva');
}
function ajustarBarra(forcar){
  const solida=!naHome()||scrollY>40;
  if(solida===barraSolida&&!forcar)return;
  barraSolida=solida;
  document.getElementById('topo').classList.toggle('solid',solida);
  animarMarca();
}
addEventListener('scroll',()=>ajustarBarra());
ajustarBarra(true);

/* Enderecos antigos (#publico, #empresas...) continuam funcionando:
   quem chegar por um link velho e' levado a pagina certa.            */
const ROTAS={home:'/',publico:'/setor-publico/',empresas:'/empresas/',ensino:'/ensino-e-filantropia/',imoveis:'/imoveis/',parceiro:'/indique-seu-municipio/',diferencial:'/diferencial/',quem:'/quem-somos/',experiencia:'/experiencia/',contato:'/contato/'};
(function(){
  const h=(location.hash||'').replace('#','');
  if(h&&ROTAS[h]&&ROTAS[h]!==location.pathname)location.replace(ROTAS[h]);
})();

/* ============ BASE DE MUNICÍPIOS — só nome, UF e população ============
   Serve ao autocompletar dos formulários e ao painel do topo.
   Nenhum valor financeiro é lido nem exibido.                          */
let MUN=null;
/* aviso visível quando a base de municípios não está na pasta */
function baseFalhou(){
  BASE_OK=false;
  const d=document.getElementById('dicaMun');
  if(d){d.textContent='Informe a cidade e o estado — ex.: Sumaré / SP.'}
  ['rMun','paMun'].forEach(id=>{const el=document.getElementById(id);
    if(el)el.placeholder='Cidade / UF — ex.: Sumaré / SP'});
  console.warn('base-municipios.js não foi encontrado na pasta do site.');
}
let BASE_OK=null;
function carregarBase(){
  if(!window.BASE_MUN){if(BASE_OK!==false)baseFalhou();return null}
  BASE_OK=true;
  if(MUN)return MUN;
  MUN=[];
  for(const uf in window.BASE_MUN){
    window.BASE_MUN[uf].split(';').forEach(l=>{
      const c=l.split('|');
      if(c[0])MUN.push({uf,nome:c[0],pop:+c[1]||0});
    });
  }
  return MUN;
}
const semAcento=t=>(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function sugerir(txt){
  const b=carregarBase(); if(!b||!txt)return [];
  const t=semAcento(txt), uf=(t.match(/[\/\-]\s*([a-z]{1,2})\s*$/)||[])[1];
  const nome=t.replace(/[\/\-]\s*[a-z]{0,2}\s*$/,'').trim();
  if(nome.length<2)return [];
  return b.filter(m=>semAcento(m.nome).startsWith(nome)&&(!uf||m.uf.toLowerCase().startsWith(uf)))
          .sort((a,c)=>(semAcento(a.nome)===nome?-1:0)-(semAcento(c.nome)===nome?-1:0)||c.pop-a.pop)
          .slice(0,8);
}
/* preenche o datalist de um campo de município */
function sugMun(input,idLista){
  const ds=document.getElementById(idLista); if(!ds)return;
  ds.innerHTML=sugerir(input.value).map(x=>'<option value="'+x.nome+' / '+x.uf+'">').join('');
}
/* ao sair do campo, reconhece a cidade e completa o estado sozinho.
   Nomes repetidos em vários estados não são adivinhados — o site pergunta. */
function completarMun(el){
  if(!el.value.trim())return;
  const b=carregarBase();
  if(!b){el.value=el.value.trim();return}
  const t=semAcento(el.value);
  const casaUf=t.match(/[\/\-,]\s*([a-z]{2})\s*$/);
  const uf=casaUf?casaUf[1]:null;
  const nome=t.replace(/[\/\-,]\s*[a-z]{2}\s*$/,'').replace(/[\/\-,]\s*$/,'').trim();
  if(nome.length<3)return;
  let c=b.filter(m=>semAcento(m.nome)===nome&&(!uf||m.uf.toLowerCase()===uf));
  if(!c.length&&!uf){
    const pre=b.filter(m=>semAcento(m.nome).startsWith(nome));
    if(pre.length===1)c=pre;
  }
  if(c.length===1){
    el.value=c[0].nome+' / '+c[0].uf;
    el.classList.add('campo-ok');
    setTimeout(()=>el.classList.remove('campo-ok'),1800);
    return;
  }
  if(c.length>1){
    const ufs=[...new Set(c.map(m=>m.uf))].sort();
    toast(c[0].nome+' existe em '+ufs.length+' estados ('+ufs.join(', ')+'). Informe qual.');
    el.classList.add('campo-duvida');
    setTimeout(()=>el.classList.remove('campo-duvida'),2600);
  }
}

/* ============ PAINEL DO TOPO — municípios da base, sem valores ============ */
let vivoTimer=null;
function iniciarVivo(){
  const b=carregarBase(); if(!b||!b.length)return;
  const box=document.getElementById('vivo'); if(!box)return;
  const destaque=b.filter(m=>m.pop>=25000).sort(()=>Math.random()-0.5);
  if(!destaque.length)return;
  box.hidden=false;
  let i=0;
  const passo=()=>{
    const m=destaque[i%destaque.length]; i++;
    const nome=document.getElementById('vivoNome'), uf=document.getElementById('vivoUf');
    [nome,uf].forEach(e=>{e.classList.remove('vivo-troca');void e.offsetWidth;e.classList.add('vivo-troca')});
    nome.textContent=m.nome;
    uf.textContent=m.uf+' · '+nf(m.pop)+' habitantes';
  };
  passo();
  clearInterval(vivoTimer);
  vivoTimer=setInterval(passo,3200);
}

/* ============ MÍDIA PAGA: UTM, DEEP LINK E EVENTOS ============ */
const PARAMS=new URLSearchParams(location.search);
const ORIGEM={
  utm_source:PARAMS.get('utm_source')||'',
  utm_medium:PARAMS.get('utm_medium')||'',
  utm_campaign:PARAMS.get('utm_campaign')||'',
  utm_content:PARAMS.get('utm_content')||'',
  utm_term:PARAMS.get('utm_term')||'',
  anuncio:PARAMS.get('ad')||PARAMS.get('anuncio')||'',
  referencia:document.referrer||''
};
function rotuloOrigem(){
  if(ORIGEM.utm_source||ORIGEM.utm_campaign)
    return [ORIGEM.utm_source,ORIGEM.utm_medium,ORIGEM.utm_campaign,ORIGEM.utm_content].filter(Boolean).join(' · ');
  const r=ORIGEM.referencia;
  if(/instagram/i.test(r))return 'instagram · orgânico';
  if(/facebook/i.test(r))return 'facebook · orgânico';
  if(/google/i.test(r))return 'google · busca';
  return r?('site externo · '+r.replace(/^https?:\/\//,'').split('/')[0]):'acesso direto';
}
/* deep link do anúncio: ?municipio=Indaiatuba%20/%20SP */
function aplicarDeepLink(){
  const mun=PARAMS.get('municipio')||PARAMS.get('cidade')||'';
  if(!mun)return;
  ['rMun','paMun','eEnte'].forEach(id=>{const el=document.getElementById(id);if(el&&!el.value)el.value=mun});
}
function carregarPixel(){
  if(!CONFIG.metaPixelId)return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init',CONFIG.metaPixelId); fbq('track','PageView');
}
function evento(nome,dados){
  try{ if(window.fbq) fbq('track',nome,dados||{}); }catch(e){}
  try{ if(window.gtag) gtag('event',nome,dados||{}); }catch(e){}
}
function barraCookies(){
  if(!CONFIG.metaPixelId)return;
  let ok=null; try{ok=sessionStorage.getItem('pc_cookies')}catch(e){}
  if(ok==='1'){carregarPixel();return}
  if(ok==='0')return;
  const d=document.createElement('div');
  d.style.cssText='position:fixed;left:14px;right:14px;bottom:14px;z-index:200;background:#1b1e20;color:#fff;'+
    'border-radius:14px;padding:16px 18px;box-shadow:0 18px 50px rgba(0,0,0,.4);display:flex;gap:14px;'+
    'align-items:center;flex-wrap:wrap;max-width:760px;margin:0 auto;font-size:13px;line-height:1.55';
  d.innerHTML='<div style="flex:1;min-width:220px;color:rgba(255,255,255,.8)">Usamos cookies de medição para saber quais anúncios trazem visitantes. '+
    'Você pode recusar sem perder nenhuma função do site. <a href="#" onclick="modal(\'privacidade\');return false" style="color:#fff;text-decoration:underline">Aviso de privacidade</a></div>'+
    '<div style="display:flex;gap:8px"><button class="btn btn-p btn-sm" id="ckSim">Aceitar</button>'+
    '<button class="btn btn-g btn-sm" id="ckNao">Recusar</button></div>';
  document.body.appendChild(d);
  d.querySelector('#ckSim').onclick=()=>{try{sessionStorage.setItem('pc_cookies','1')}catch(e){};carregarPixel();d.remove()};
  d.querySelector('#ckNao').onclick=()=>{try{sessionStorage.setItem('pc_cookies','0')}catch(e){};d.remove()};
}

/* ============ ABAS E MODAIS ============ */
function aba(id,btn){['pj1','pj2','pj3'].forEach(x=>document.getElementById(x).hidden=x!==id);
  btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===btn))}
function perfil(p,btn){document.getElementById('fEnte').hidden=p!=='ente';
  document.getElementById('fEmpresa').hidden=p!=='empresa';
  btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===btn))}
function modal(n){document.getElementById('m'+n.charAt(0).toUpperCase()+n.slice(1)).hidden=false;document.body.style.overflow='hidden'}
function fecharModal(id){document.getElementById(id).hidden=true;document.body.style.overflow=''}
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)fecharModal(m.id)}));
addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal').forEach(m=>fecharModal(m.id))});

function perfilIndicador(){
  const agente=document.getElementById('paPerfil').value==='agente';
  document.getElementById('paAvisoAgente').hidden=!agente;
  document.getElementById('paDeclBox').hidden=agente;
  if(agente)document.getElementById('paDecl').checked=false;
  document.getElementById('paBtn').textContent=agente?'Registrar indicação institucional':'Registrar indicação';
}

/* ============ CONFIRMAÇÃO NA TELA ============ */
function confirmar(tipo){
  const troca=(a,b)=>{const x=document.getElementById(a),y=document.getElementById(b);
    if(x&&y){x.hidden=true;y.hidden=false;y.scrollIntoView({behavior:'smooth',block:'center'})}};
  if(tipo==='rapido')  return troca('rForm','rOk');
  if(tipo==='imovel')  return troca('iForm','iOk');
  if(tipo==='parceiro')return troca('paForm','paOk');
  if(tipo==='ente'||tipo==='empresa'){
    const box=document.querySelector('.cbox'); if(!box)return;
    box.innerHTML='<div class="aviso a-verde"><b>Cadastro recebido</b>'+
      'Nossa equipe entra em contato pelo canal informado para entender o seu caso e apresentar o levantamento preliminar. '+
      'Cada ente e cada empresa tem uma situação própria — por isso conversamos antes de apresentar qualquer número.</div>'+
      '<a class="btn btn-p btn-full" style="margin-top:14px" href="https://wa.me/'+CONFIG.whatsapp+
      '?text='+encodeURIComponent('Olá, acabei de me cadastrar no site.')+'" target="_blank" rel="noopener">Adiantar pelo WhatsApp</a>';
    box.scrollIntoView({behavior:'smooth',block:'center'});
  }
}

function gerarLinkWhatsAppRapido(d,assunto){
  const corpo=[
    'Olá, gostaria de falar com a equipe PrimeCorp.',
    'Perfil: '+d.perfil,
    'Nome: '+d.nome,
    'Município e estado: '+d.municipio,
    d.telefone?'WhatsApp informado: '+d.telefone:'',
    d.email?'E-mail informado: '+d.email:''
  ].filter(Boolean).join('\n');
  const link='https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(assunto+'\n\n'+corpo);
  const form=document.getElementById('rForm'),ok=document.getElementById('rOk');
  if(!form||!ok)return;
  form.hidden=true;
  ok.hidden=false;
  ok.innerHTML='<div class="aviso a-verde" style="margin-top:4px"><b>Cadastro preparado</b>Confira os dados preenchidos e toque no botão para abrir o WhatsApp com a mensagem pronta. O envio só acontece quando você confirmar no WhatsApp.</div>'+
    '<a class="btn btn-p btn-full" href="'+link+'" target="_blank" rel="noopener">Enviar pelo WhatsApp</a>';
  ok.scrollIntoView({behavior:'smooth',block:'center'});
}

function gerarLinkWhatsAppIndicacao(d,assunto){
  const corpo=[
    'Olá, gostaria de registrar uma indicação de município para a equipe PrimeCorp.',
    'Perfil: '+d.perfil,
    'Nome: '+d.nome,
    'Município indicado: '+d.municipio,
    'Acesso à gestão: '+d.acesso,
    d.observacao?'Observação: '+d.observacao:'',
    d.telefone?'WhatsApp informado: '+d.telefone:'',
    d.email?'E-mail informado: '+d.email:'',
    d.declaracao?'Declaração: '+d.declaracao:''
  ].filter(Boolean).join('\n');
  const link='https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(assunto+'\n\n'+corpo);
  const form=document.getElementById('paForm'),ok=document.getElementById('paOk');
  if(!form||!ok)return;
  form.hidden=true;
  ok.hidden=false;
  ok.innerHTML='<div class="aviso a-verde"><b>Indicação preparada</b>Confira os dados preenchidos e toque no botão para abrir o WhatsApp com a mensagem pronta. O envio só acontece quando você confirmar no WhatsApp.</div>'+
    '<a class="btn btn-p btn-full" style="margin-top:12px" href="'+link+'" target="_blank" rel="noopener">Enviar pelo WhatsApp</a>';
  ok.scrollIntoView({behavior:'smooth',block:'center'});
}

function gerarLinkWhatsAppContato(d,assunto){
  const corpo=[
    'Olá, gostaria de falar com a equipe PrimeCorp.',
    'Perfil: '+d.perfil,
    'Nome: '+d.nome,
    d.cargo?'Cargo: '+d.cargo:'',
    d.ente?'Ente que representa: '+d.ente:'',
    d.populacao?'População estimada: '+d.populacao:'',
    d.empresa?'Empresa: '+d.empresa:'',
    d.regime?'Regime tributário: '+d.regime:'',
    d.interesse?'Interesse: '+d.interesse:''
  ].filter(Boolean).join('\n');
  const link='https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(assunto+'\n\n'+corpo);
  const box=document.querySelector('.cbox');
  if(!box)return;
  box.innerHTML='<div class="aviso a-verde"><b>Solicitação preparada</b>Confira os dados preenchidos e toque no botão para abrir o WhatsApp com a mensagem pronta. O envio só acontece quando você confirmar no WhatsApp.</div>'+
    '<a class="btn btn-p btn-full" style="margin-top:14px" href="'+link+'" target="_blank" rel="noopener">Enviar pelo WhatsApp</a>';
  box.scrollIntoView({behavior:'smooth',block:'center'});
}

/* ============ ENVIO ============ */
function enviar(tipo){
  let d,assunto;
  if(tipo==='rapido'){
    if(!val('rNome')||!val('rMun'))
      return toast('Preencha nome e município.','err');
    if(!rLgpd.checked)return toast('É necessário autorizar o contato.','err');
    d={perfil:val('rPerfil')||'não informado',solicitacao:'Cadastro rápido — quer falar com a equipe',
       nome:val('rNome'),municipio:val('rMun'),email:val('rMail'),telefone:val('rFone')};
    assunto='Cadastro rápido — '+d.municipio;
  }else if(tipo==='ente'){
    if(!val('eNome')||!val('eCargo')||!val('eEnte'))return toast('Preencha nome, cargo e ente.','err');
    if(!eLgpd.checked)return toast('É necessário autorizar o tratamento dos dados.','err');
    d={perfil:'ente público',solicitacao:'Levantamento preliminar do ente',nome:val('eNome'),cargo:val('eCargo'),
       ente:val('eEnte'),populacao:val('ePop')||'não informada'};
    assunto='Solicitação de levantamento — '+d.ente;
  }else if(tipo==='empresa'){
    if(!val('cNome')||!val('cEmp'))return toast('Preencha nome e empresa.','err');
    if(!cLgpd.checked)return toast('É necessário autorizar o tratamento dos dados.','err');
    d={perfil:'empresa',solicitacao:'Avaliação preliminar PJ',nome:val('cNome'),empresa:val('cEmp'),
       regime:val('cReg'),interesse:val('cInt')};
    assunto='Solicitação de avaliação — '+d.empresa;
  }else if(tipo==='parceiro'){
    const agente=document.getElementById('paPerfil').value==='agente';
    if(!val('paNome')||!val('paMun'))return toast('Preencha nome e município.','err');
    if(!agente&&!paDecl.checked)return toast('A declaração de não-vínculo é obrigatória.','err');
    if(!paLgpd.checked)return toast('É necessário aceitar as regras e o aviso de privacidade.','err');
    const sel=document.getElementById('paPerfil');
    d={perfil:agente?'AGENTE PÚBLICO do ente indicado — indicação institucional, SEM remuneração'
                    :sel.options[sel.selectedIndex].text,
       solicitacao:agente?'Indicação institucional de município — SEM remuneração':'Indicação de município',
       nome:val('paNome'),municipio:val('paMun'),acesso:val('paAcesso'),observacao:val('paObs'),
       declaracao:agente?'Agente público do ente indicado — vedada qualquer remuneração'
                        :'Declarou não ser servidor público, agente político nem parente até 3º grau de agente do ente indicado'};
    assunto=(agente?'Indicação institucional — ':'Nova indicação — ')+d.municipio;
  }else if(tipo==='imovel'){
    if(!val('iNome')||!val('iCidade')||(!val('iMail')&&!val('iFone')))
      return toast('Preencha nome, cidade e ao menos um contato.','err');
    if(!iLgpd.checked)return toast('É necessário autorizar o contato.','err');
    d={perfil:'Imóveis — '+val('iPerfil'),
       solicitacao:'Intermediação de negócios',
       nome:val('iNome'),municipio:val('iCidade'),
       tipoImovel:val('iTipo')||'não informado',
       valor:val('iValor')||'a combinar',
       observacao:val('iObs'),email:val('iMail'),telefone:val('iFone')};
    assunto='Imóveis — '+(val('iTipo')||'ativo')+' — '+d.municipio;
  }else return;

  d.origem=rotuloOrigem();
  d.campanha=[ORIGEM.utm_campaign,ORIGEM.utm_content,ORIGEM.anuncio].filter(Boolean).join(' | ');
  d.enviadoEm=new Date().toLocaleString('pt-BR');

  if(tipo==='rapido'){
    evento('LeadWhatsApp',{content_name:d.solicitacao,content_category:d.perfil});
    return gerarLinkWhatsAppRapido(d,assunto);
  }
  if(tipo==='parceiro'){
    evento('LeadWhatsApp',{content_name:d.solicitacao,content_category:d.perfil});
    return gerarLinkWhatsAppIndicacao(d,assunto);
  }
  if(tipo==='ente'||tipo==='empresa'){
    evento('LeadWhatsApp',{content_name:d.solicitacao,content_category:d.perfil});
    return gerarLinkWhatsAppContato(d,assunto);
  }

  toast('Enviando sua solicitação…');
  evento('Lead',{content_name:d.solicitacao,content_category:d.perfil});

  const payload={
    _subject:assunto, _template:'table', _captcha:'false', _cc:CONFIG.emailCopia,
    'Perfil':d.perfil, 'Solicitação':d.solicitacao, 'Nome':d.nome||'',
    'Cargo':d.cargo||'', 'Ente':d.ente||'', 'Empresa':d.empresa||'', 'Município':d.municipio||'',
    'População':d.populacao||'', 'Regime':d.regime||'', 'Interesse':d.interesse||'',
    'E-mail':d.email||'', 'WhatsApp':d.telefone||'', 'Acesso à gestão':d.acesso||'',
    'Observação':d.observacao||'', 'Declaração':d.declaracao||'',
    'Tipo de imóvel':d.tipoImovel||'', 'Valor pretendido':d.valor||'',
    'Origem':d.origem, 'Campanha':d.campanha||'', 'Enviado em':d.enviadoEm
  };
  Object.keys(payload).forEach(k=>{if(payload[k]==='')delete payload[k]});

  fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify(payload)})
    .then(r=>r.ok?r.json().catch(()=>({success:true})):Promise.reject())
    .then(()=>{toast('Solicitação enviada. Nossa equipe entra em contato em breve.','ok');confirmar(tipo)})
    .catch(()=>fallback(assunto,d,tipo));
}
/* O envio automático falhou. NÃO anunciamos sucesso: o cadastro ainda não
   chegou. Abrimos um painel que fica na tela até o visitante agir, com links
   reais — um clique do próprio visitante não é bloqueado pelo navegador,
   ao contrário de window.open disparado depois de uma chamada de rede. */
function fallback(assunto,d,tipo){
  const corpo=Object.entries(d).map(([k,v])=>v?k+': '+v:'').filter(Boolean).join('\n');
  const zap='https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(assunto+'\n\n'+corpo);
  const mail='mailto:'+CONFIG.emailDestino+'?subject='+encodeURIComponent(assunto)+
             '&body='+encodeURIComponent(corpo);

  const anterior=document.getElementById('pcResgate');
  if(anterior)anterior.remove();

  const p=document.createElement('div');
  p.id='pcResgate';
  p.setAttribute('role','alertdialog');
  p.setAttribute('aria-labelledby','pcResgateTit');
  p.style.cssText='position:fixed;inset:0;z-index:300;background:rgba(20,23,25,.72);'+
    'display:flex;align-items:center;justify-content:center;padding:18px';
  p.innerHTML=
    '<div style="background:#1b1e20;color:#fff;border-radius:16px;padding:26px;max-width:470px;width:100%;'+
      'box-shadow:0 24px 64px rgba(0,0,0,.5);font-size:14px;line-height:1.6">'+
      '<div id="pcResgateTit" class="ff" style="font-size:21px;font-weight:700;margin-bottom:10px">'+
        'Falta um toque para concluir</div>'+
      '<p style="color:rgba(255,255,255,.72);margin-bottom:8px">Não conseguimos registrar o seu '+
        'cadastro automaticamente agora. Seus dados já estão na mensagem — escolha por onde '+
        'enviar e toque em enviar.</p>'+
      '<p style="color:rgba(255,255,255,.45);font-size:12.5px;margin-bottom:18px">Se fechar sem enviar, '+
        'a solicitação não chega até nós.</p>'+
      '<a class="btn btn-p btn-full" href="'+zap+'" target="_blank" rel="noopener" id="pcResgateZap">'+
        'Enviar pelo WhatsApp</a>'+
      '<a class="btn btn-g btn-full" style="margin-top:9px" href="'+mail+'" id="pcResgateMail">'+
        'Enviar por e-mail</a>'+
      '<button class="btn btn-full" style="margin-top:4px;color:rgba(255,255,255,.5);font-weight:500;'+
        'font-size:13px" id="pcResgateFechar">Agora não</button>'+
    '</div>';
  document.body.appendChild(p);
  document.body.style.overflow='hidden';

  const encerrar=()=>{p.remove();document.body.style.overflow=''};
  /* só confirmamos na tela depois que o visitante realmente despachou */
  const concluiu=()=>{encerrar();
    toast('Obrigado — assim que a mensagem chegar, nossa equipe responde.','ok');
    confirmar(tipo)};
  p.querySelector('#pcResgateZap').addEventListener('click',concluiu);
  p.querySelector('#pcResgateMail').addEventListener('click',concluiu);
  p.querySelector('#pcResgateFechar').addEventListener('click',encerrar);
  p.addEventListener('click',e=>{if(e.target===p)encerrar()});
  p.querySelector('#pcResgateZap').focus();

  toast('Não conseguimos enviar automaticamente — escolha um canal para concluir.','err');
}

/* ============ RENDER ============ */
const _elPub=document.getElementById('matPub');
if(_elPub)_elPub.innerHTML=MAT_PUB.map(m=>'<div class="mat">'+
  '<div class="mat-top"><div><h3>'+m.k+'</h3><div class="sig">'+m.sig+'</div></div>'+
    '<span class="pill '+(m.via==='Administrativo'?'p-adm':'p-jud')+'">'+m.via+'</span></div>'+
  '<p>'+m.desc+'</p>'+
  '<div class="tiny muted" style="border-top:1px solid var(--linha2);padding-top:9px">'+m.prazo+' · '+m.modo+'</div></div>').join('');
const _elPJ=document.getElementById('matPJ');
if(_elPJ)_elPJ.innerHTML=MAT_PJ.map(function(x){
  return '<div class="mat">'+
  '<div class="mat-top"><div><h3>'+x[0]+'</h3><div class="sig">'+x[1]+'</div></div><span class="pill '+x[2]+'">'+x[3]+'</span></div>'+
  '<p>'+x[4]+'</p></div>'}).join('');

if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target)}),{threshold:.15});
  document.querySelectorAll('.card,.mat,.porta,.emp,.pessoa').forEach(el=>{el.classList.add('rev');io.observe(el)});
}

const _ano=document.getElementById('ano');
if(_ano)_ano.textContent=new Date().getFullYear();
aplicarDeepLink();barraCookies();

/* Links editoriais comuns: entram antes da consulta em menus legados. */
const inserirLinkMenu=(menu,href,text)=>{
  if(menu.querySelector('a[href="'+href+'"]'))return;
  const link=document.createElement('a');
  link.href=href;
  link.textContent=text;
  const consulta=menu.querySelector('a[href="/contato/"]');
  menu.insertBefore(link,consulta||null);
};
document.querySelectorAll('.menu').forEach(menu=>{
  inserirLinkMenu(menu,'/conteudos/','Conteúdos');
  inserirLinkMenu(menu,'/ferramentas/','Ferramentas');
});

/* Links contextuais: relaciona serviços comerciais às ferramentas correspondentes. */
const TOOL_CONTEXT=[
  ['/setor-publico/revisao-fpm-fpe/','/ferramentas/fpm/','Orientador de consulta do FPM'],
  ['/setor-publico/revisao-rat-fap/','/ferramentas/rat-fap/','Simulador educativo RAT e FAP'],
  ['/setor-publico/recuperacao-creditos-previdenciarios/','/ferramentas/checklist-prefeitura/','Checklist para prefeituras'],
  ['/setor-publico/recuperacao-pasep-municipios/','/ferramentas/checklist-prefeitura/','Checklist para prefeituras'],
  ['/empresas/recuperacao-creditos-tributarios/','/ferramentas/checklist-empresa/','Checklist empresarial'],
  ['/empresas/recuperacao-creditos-previdenciarios/','/ferramentas/checklist-empresa/','Checklist empresarial'],
  ['/empresas/revisao-rat-fap/','/ferramentas/rat-fap/','Simulador educativo RAT e FAP'],
  ['/empresas/restituicao-compensacao-perdcomp/','/ferramentas/restituicao-compensacao/','Orientador de restituição ou compensação'],
  ['/empresas/regularizacao-cnpj-inapto/','/ferramentas/cnpj/','Orientador de situação cadastral do CNPJ']
];
const toolMatch=TOOL_CONTEXT.find(x=>location.pathname===x[0]);
const toolArticle=document.querySelector('.seo-content');
if(toolMatch&&toolArticle&&!toolArticle.querySelector('.tool-context-link')){
  const p=document.createElement('p');p.className='tool-context-link';
  p.innerHTML='<strong>Ferramenta relacionada:</strong> <a href="'+toolMatch[1]+'">'+toolMatch[2]+'</a>.';
  toolArticle.appendChild(p);
}

/* Índices editoriais: mantém os novos guias acessíveis a partir do hub existente. */
if(location.pathname==='/conteudos/'&&!document.querySelector('.content-category-nav')){
  const hub=document.querySelector('.content-hub .wrap');
  if(hub&&!hub.querySelector('.new-guides-index')){
    const section=document.createElement('section');
    section.className='content-section new-guides-index';
    section.innerHTML='<h2>Guias e legislação</h2><p class="content-intro">Aprofunde temas específicos em páginas organizadas por assunto, com fontes oficiais e links para ferramentas educativas.</p><div class="content-cards"><a class="content-card" href="/guias/"><div class="eyebrow">Guias práticos</div><h3>Guias de tributos, previdência e gestão pública</h3><p>Conteúdos para organizar documentos, prazos, transferências e procedimentos.</p><span>Ver guias →</span></a><a class="content-card" href="/legislacao/"><div class="eyebrow">Legislação</div><h3>Legislação tributária e previdenciária</h3><p>Referências legislativas com contexto prático e fontes oficiais.</p><span>Ver legislação →</span></a></div>';
    const cta=hub.querySelector('.seo-cta');
    hub.insertBefore(section,cta||null);
  }
}

/* Filtro progressivo da central: todos os links permanecem no HTML inicial. */
if(location.pathname==='/conteudos/'){
  const input=document.querySelector('#content-filter-input');
  const buttons=[...document.querySelectorAll('.filter-button')];
  const cards=[...document.querySelectorAll('[data-content-card]')];
  const status=document.querySelector('#content-filter-status');
  const applyContentFilter=()=>{
    const term=(input?.value||'').trim().toLowerCase();
    const active=buttons.find(b=>b.classList.contains('is-active'))?.dataset.filter||'all';
    let visible=0;
    cards.forEach(card=>{
      const categoryKey=card.closest('.content-section')?.id||'';
      const match=(active==='all'||active===categoryKey)&&(!term||(card.dataset.search||'').includes(term));
      card.classList.toggle('is-filtered-out',!match);
      if(match)visible++;
    });
    if(status)status.textContent=visible+' conteúdo'+(visible===1?' encontrado':'s encontrados');
  };
  buttons.forEach(button=>button.addEventListener('click',()=>{
    buttons.forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active));});
    applyContentFilter();
  }));
  input?.addEventListener('input',applyContentFilter);
  applyContentFilter();
}
