// EDITA ESTA LISTA para poner tus canciones, portadas y descripciones.
// Coloca tus archivos dentro de dist/assets y cambia cover/audio, por ejemplo:
// cover: 'assets/mi-portada.jpg', audio: 'assets/mi-cancion.mp3'
const songs = [
  { title:'Soy Solo Tú', description:'Una confesión directa: entre tantas personas, mi mirada siempre termina encontrándote a ti.', cover:'assets/covers/soy-solo-tu.svg', audio:'assets/music/soy-solo-tu.mp3' },
  { title:'Solo Tu Tonto', description:'La historia de alguien que se vuelve torpe cuando intenta esconder todo lo que siente.', cover:'assets/covers/solo-tu-tonto.svg', audio:'assets/music/solo-tu-tonto.mp3' },
  { title:'Qué Tonto Fui', description:'Mirar hacia atrás y reconocer las palabras que debimos decir antes de que fuera tarde.', cover:'assets/covers/que-tonto-fui.svg', audio:'assets/music/que-tonto-fui.mp3' },
  { title:'Esos Malditos Celos', description:'Una emoción intensa que nace cuando el corazón teme perder a su persona favorita.', cover:'assets/covers/esos-malditos-celos.svg', audio:'assets/music/esos-malditos-celos.mp3' },
  { title:'Dos Mundos Extraños', description:'Dos personas diferentes aprendiendo a encontrarse en un punto que solo ellas comprenden.', cover:'assets/covers/dos-mundos-extranos.svg', audio:'assets/music/dos-mundos-extranos.mp3' },
  { title:'Dos Mundos Perdidos', description:'Dos almas desorientadas que, al coincidir, dejan de sentirse tan lejos de casa.', cover:'assets/covers/dos-mundos-perdidos.svg', audio:'assets/music/dos-mundos-perdidos.mp3' },
  { title:'Tú Tienes Tu Lugar', description:'Un recordatorio de que nadie puede reemplazar el espacio que guardé especialmente para ti.', cover:'assets/covers/tu-tienes-tu-lugar.svg', audio:'assets/music/tu-tienes-tu-lugar.mp3' },
  { title:'Una Parte de Mi Alma', description:'Para quien se volvió parte de mis recuerdos, mis canciones y todo lo que llevo por dentro.', cover:'assets/covers/una-parte-de-mi-alma.svg', audio:'assets/music/una-parte-de-mi-alma.mp3' }
];

const $=s=>document.querySelector(s), drawer=$('#musicDrawer'), backdrop=$('#backdrop'), audio=$('#audio');
function openMusic(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');backdrop.classList.add('show');document.body.style.overflow='hidden'}
function closeMusic(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');backdrop.classList.remove('show');document.body.style.overflow=''}
$('#openMusic').onclick=$('#openMusic2').onclick=openMusic; $('#closeMusic').onclick=closeMusic; backdrop.onclick=closeMusic;
$('#openLetter').onclick=(event)=>{const destination=event.currentTarget.href;event.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.assign(destination),420)}; document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$('#'+b.dataset.close).close());

const list=$('#songList');
songs.forEach((song,i)=>{const item=document.createElement('article');item.className='song';item.innerHTML=`<img class="song-cover" src="${song.cover}" alt=""><div><h3>${song.title}</h3><p>${song.description}</p></div><span>▶</span>`;item.onclick=()=>selectSong(i,item);list.appendChild(item)});
const playButton=$('#playPause'),playerStatus=$('#playerArtist');
async function startPlayback(){
  if(!audio.src)return;
  audio.muted=false;
  audio.volume=1;
  playButton.disabled=true;
  playButton.textContent='…';
  playerStatus.textContent='Cargando canción…';
  try{
    await audio.play();
    playButton.textContent='❚❚';
    playerStatus.textContent='Reproduciendo para ti';
  }catch(error){
    playButton.textContent='▶';
    playerStatus.textContent='Toca ▶ para reproducir';
    console.warn('El navegador no permitió iniciar el audio:',error);
  }finally{
    playButton.disabled=false;
  }
}
function selectSong(i,item){
  const song=songs[i];
  document.querySelectorAll('.song').forEach(x=>x.classList.remove('active'));
  item.classList.add('active');
  $('#playerCover').src=song.cover;
  $('#playerTitle').textContent=song.title;
  audio.pause();
  audio.src=new URL(song.audio,document.baseURI).href;
  audio.load();
  startPlayback();
}
playButton.onclick=()=>{if(!audio.src)return;if(audio.paused)startPlayback();else{audio.pause();playButton.textContent='▶';playerStatus.textContent='En pausa'}};
audio.ontimeupdate=()=>{$('#progressBar').style.width=(audio.currentTime/audio.duration*100||0)+'%'};audio.onended=()=>$('#playPause').textContent='▶';
audio.onerror=()=>{playButton.textContent='▶';playButton.disabled=false;playerStatus.textContent='No se pudo cargar esta canción'};

function petal(){const p=document.createElement('i');p.className='petal';p.style.left=Math.random()*100+'vw';p.style.setProperty('--drift',(Math.random()*180-90)+'px');p.style.animationDuration=(5+Math.random()*6)+'s';p.style.opacity=.25+Math.random()*.6;$('#petals').appendChild(p);setTimeout(()=>p.remove(),11000)}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(petal,480);
