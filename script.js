const projects = [
  {title:'Techflow ERP',short:'TECHFLOW ERP',kind:'SHARED PROJECT',context:'Collaborative work with Deep Gandhi · Manufacturing ERP',status:'Outcome reported by Deep Gandhi’s portfolio',category:'MANUFACTURING / ERP',summary:'A manufacturing operations platform connecting workflows across inventory, machine planning, maintenance, service, visitor management, and paint jobs.',points:['Connected six operational areas in one platform: Inventory, Machine Planning, Maintenance, Service, Visitor, and Paint Job.','Supported real-time machine planning and tracking.','Deep Gandhi’s portfolio reports 200+ work hours saved weekly; this figure is attributed to that source.'],tech:'Django · React · PostgreSQL · Docker',note:'Shared project. The reported time savings are attributed to Deep Gandhi’s portfolio.',color:'#496d57',ink:'#f3ebd8',emblem:'✳'},
  {title:'Unified Equipment Monitoring',short:'EQUIPMENT MONITORING',kind:'TEAM CAPSTONE',context:'Daemyung Steel · Team MEGAMIND',status:'Capstone project · proposed system',category:'INDUSTRIAL / DATA',summary:'A team capstone exploring how equipment signals could give production teams a live and historical view of industrial machines.',points:['Planned PLC data ingestion with I/O mapping and alarm visibility.','Designed live and historical dashboard views for equipment data.','The proposed architecture used FastAPI, WebSockets, and DuckDB.'],tech:'FastAPI · WebSockets · DuckDB · PLC data',note:'Project details describe the capstone scope and proposed architecture.',color:'#536f78',ink:'#f3ebd8',emblem:'⌁'},
  {title:'CAD System Development',short:'CAD SYSTEMS',kind:'DEVELOPMENT WORK',context:'CAD development and workflow automation',status:'Development work',category:'CAD / AUTOMATION',summary:'Development work focused on CAD tools and automation, with the goal of reducing repetitive technical workflows.',points:['Explored CAD system development and automation opportunities.','Worked with AutoCAD and Fusion 360 in technical workflows.','Focused on making repeated design tasks easier to manage.'],tech:'AutoCAD · Fusion 360 · CAD automation',note:'The project description is kept to the scope established in the portfolio discussion.',color:'#7d7652',ink:'#f7f0dd',emblem:'⌂'},
  {title:'Restaurant Edge Growth AI',short:'EDGE GROWTH AI',kind:'PRODUCT CONCEPT',context:'Independent product idea · local restaurant marketing',status:'Product concept',category:'AI / LOCAL BUSINESS',summary:'A lightweight assistant concept to help restaurants turn customer feedback into review content and plan practical local-search improvements.',points:['Collect simple ratings for food, service, and cleanliness, then help draft review text for platforms such as Naver or Kakao.','Explore competitor keyword scanning and monthly local SEO recommendations.','The product direction favors a lightweight, locally operated workflow to limit recurring cloud costs.'],tech:'AI-assisted writing · Feedback data · Local SEO',note:'Concept and pitch work; this is not presented as a launched product.',color:'#a85f43',ink:'#fbefda',emblem:'✦'},
  {title:'Restaurant Schedule Assistant',short:'SHIFT ASSISTANT',kind:'PRODUCT CONCEPT',context:'Workflow concept · restaurant shift scheduling',status:'Concept / prototype exploration',category:'WORKFLOW / OCR',summary:'A scheduling assistant idea for turning paper or spreadsheet shift plans into organized, reviewable digital schedules.',points:['Import schedule information from spreadsheets or photos.','Explore OCR for handwritten Korean shift grids.','Let a person check and correct imported shifts before using the schedule.'],tech:'OCR exploration · Workflow design · Data review',note:'Concept exploration; no production deployment is claimed.',color:'#a17d4c',ink:'#fff3dc',emblem:'▦'},
  {title:'NAVER Maps Events Page',short:'MAPS & EVENTS',kind:'WEB INTEGRATION',context:'React web project · map-based event discovery',status:'Web integration project',category:'WEB / MAPS',summary:'A React page concept for finding events through a map, with interactive markers that reveal event details.',points:['Integrated a map component with a reusable loader.','Added interactive markers and information windows for event locations.','Focused on making locations and event details easy to explore together.'],tech:'React · JavaScript · NAVER Maps API',note:'Portfolio project details reflect the integration work discussed.',color:'#4e756d',ink:'#f2eddc',emblem:'⌖'},
  {title:'Blood-Cancer Detection AI',short:'MEDICAL AI',kind:'EARLY AI CONCEPT',context:'Early learning concept · AI and healthcare data',status:'Early-stage concept',category:'AI / HEALTHCARE',summary:'An early concept exploring whether AI methods could support classification from blood-related medical data.',points:['Considered laboratory data and medical imagery as possible inputs.','Framed as a future learning prototype rather than a validated screening tool.','No clinical performance or diagnostic use is claimed.'],tech:'AI fundamentals · Data exploration',note:'Early-stage concept only; not a clinical system.',color:'#815c61',ink:'#faeee1',emblem:'＋'}
];

const shelf=document.querySelector('#bookcase');
const dialog=document.querySelector('#project-dialog');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const colors=['#496d57','#536f78','#7d7652','#a85f43','#a17d4c','#4e756d','#815c61'];

function makeBook(project,index){
  const button=document.createElement('button');
  button.type='button';button.className='project-book';
  button.style.setProperty('--book-color',project.color||colors[index%colors.length]);
  button.style.setProperty('--book-ink',project.ink||'#f2ead9');
  button.setAttribute('aria-label',`Open project: ${project.title}`);
  button.innerHTML=`<span class="book-spine"><span class="book-topline">${String(index+1).padStart(2,'0')} · ${project.kind}</span><span class="book-emblem" aria-hidden="true">${project.emblem||'✳'}</span><span class="book-rule"></span><span class="book-title">${project.short||project.title.toUpperCase()}</span><span class="book-number">SG / ${String(index+1).padStart(2,'0')}</span></span>`;
  button.addEventListener('click',()=>openProject(project,index,button));
  return button;
}

function renderShelf(){
  shelf.replaceChildren();
  for(let i=0;i<projects.length;i+=6){
    const row=document.createElement('div');row.className='shelf-row';row.setAttribute('role','group');row.setAttribute('aria-label',`Shelf ${Math.floor(i/6)+1}`);
    projects.slice(i,i+6).forEach((project,offset)=>row.append(makeBook(project,i+offset)));
    shelf.append(row);
  }
  const count=String(projects.length).padStart(2,'0');
  document.querySelector('#project-count').textContent=count;
  document.querySelector('#shelf-count').textContent=`${count} PROJECTS`;
}

function openProject(project,index,source){
  if(dialog.open)return;
  document.querySelector('#dialog-kicker').textContent=`${String(index+1).padStart(2,'0')} / ${project.kind}`;
  document.querySelector('#dialog-cover-title').textContent=project.title;
  document.querySelector('#dialog-meta').textContent=project.category;
  document.querySelector('#dialog-title').textContent=project.title;
  document.querySelector('#dialog-summary').textContent=project.summary;
  document.querySelector('#dialog-context').textContent=project.context;
  document.querySelector('#dialog-points').replaceChildren(...project.points.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  document.querySelector('#dialog-tech').textContent=project.tech;
  document.querySelector('#dialog-status').textContent=project.status;
  document.querySelector('#dialog-note').textContent=project.note||'';
  const cover=document.querySelector('.book-cover-page');cover.style.setProperty('--open-color',project.color||colors[index%colors.length]);
  if(reduceMotion){dialog.showModal();return;}
  const rect=source.getBoundingClientRect();
  const flyer=document.createElement('div');flyer.className='flying-book';flyer.setAttribute('aria-hidden','true');flyer.innerHTML=`<span>${project.short||project.title.toUpperCase()}</span>`;
  flyer.style.setProperty('--fly-x',`${rect.left+rect.width/2-window.innerWidth/2}px`);
  flyer.style.setProperty('--fly-y',`${rect.top+rect.height/2-window.innerHeight/2}px`);
  flyer.style.setProperty('--fly-color',project.color||colors[index%colors.length]);
  document.body.append(flyer);
  requestAnimationFrame(()=>requestAnimationFrame(()=>flyer.classList.add('fly-open')));
  window.setTimeout(()=>{flyer.remove();dialog.showModal();},640);
}

renderShelf();

const progress=document.querySelector('#reading-progress-bar');
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${max>0?window.scrollY/max*100:0}%`;}
window.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
const nav=document.querySelector('#main-nav'),menuToggle=document.querySelector('.menu-toggle');
menuToggle.addEventListener('click',()=>{const isOpen=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(isOpen));menuToggle.setAttribute('aria-label',isOpen?'Close navigation':'Open navigation');nav.classList.toggle('open',isOpen);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');}));
let closeTimer;
function closeProject(){if(!dialog.open||dialog.classList.contains('is-closing'))return;if(reduceMotion){dialog.close();return;}dialog.classList.add('is-closing');closeTimer=window.setTimeout(()=>{dialog.close();dialog.classList.remove('is-closing');},190);}
document.querySelector('.dialog-close').addEventListener('click',closeProject);
dialog.addEventListener('click',event=>{if(event.target===dialog)closeProject();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog.open){event.preventDefault();closeProject();}});
