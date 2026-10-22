/* The catalog and ranking work entirely in the browser. No account or API key. */
const QUESTIONS = [
  ['What kind of fear follows you home?', ['The supernatural','ghost supernatural'], ['Something human','killer psychological'], ['A creature in the dark','creature']],
  ['Set the mood for tonight.', ['Slow, creeping dread','slow atmospheric'], ['Edge-of-your-seat tension','tense'], ['A little wicked fun','fun']],
  ['Where would you rather get lost?', ['A haunted old house','house'], ['Somewhere far from help','isolated'], ['An ordinary town','town']],
  ['Pick your perfect Halloween weather.', ['Fog and candlelight','gothic atmospheric'], ['A cold, starless night','dark tense'], ['A strange autumn afternoon','folk surreal']],
  ['How much blood belongs on screen?', ['Keep it minimal','lowgore'], ['Some is fine','moderate'], ['Bring on the practical effects','gory']],
  ['How intense should the night get?', ['A gentle shiver','mild'], ['A proper fright','medium'], ['I want to lose sleep','intense']],
  ['What about jump scares?', ['Let the dread build','slow'], ['A few good jolts','jolts'], ['Surprise me constantly','fast jolts']],
  ['Which threat gets under your skin?', ['Losing control of myself','psychological possession'], ['Being hunted','killer survival'], ['The unknown','cosmic supernatural']],
  ['Choose an era to visit.', ['1920s–1950s','early'], ['1960s–1970s','mid'], ['1980s–1990s','late']],
  ['Black-and-white cinema?', ['I love those shadows','bw'], ['Color is my preference','color'], ['Either works','']],
  ['How should the story move?', ['Take its time','slow'], ['A steady simmer','steady'], ['Hit the ground running','fast']],
  ['Choose your cinematic flavor.', ['Dreamlike and artful','surreal'], ['Grounded and believable','grounded'], ['Big, theatrical thrills','theatrical']],
  ['Which rabbit hole sounds best?', ['Folklore and rituals','folk occult'], ['Science gone wrong','science'], ['A secret behind the door','mystery']],
  ['Your ideal lead character?', ['An ordinary survivor','survival'], ['An investigator','investigation'], ['Someone coming undone','psychological']],
  ['How much humor in your horror?', ['Dead serious','serious'], ['A little dark wit','wit'], ['Make me laugh, then scream','fun']],
  ['Choose a nightmare location.', ['An old-world castle','gothic'], ['A remote outpost','isolated'], ['Right next door','town house']],
  ['How do you feel about ambiguity?', ['Give me something to puzzle over','ambiguous'], ['A little mystery is good','mystery'], ['I like a clear showdown','showdown']],
  ['What makes a monster memorable?', ['A tragic soul','tragic'], ['An unstoppable presence','unstoppable'], ['An impossible transformation','body creature']],
  ['What stays with you after the credits?', ['An unsettling idea','psychological ambiguous'], ['An unforgettable image','iconic atmospheric'], ['A pulse-pounding finale','showdown fast']],
  ['Who’s joining the screening?', ['Just me and the darkness','serious atmospheric'], ['A fellow horror devotee','intense surreal'], ['A group with popcorn','fun iconic']]
];
const ACTS = ['THE ATMOSPHERE','YOUR FEAR FACTOR','THE FILM STOCK','THE DARK DETAILS','THE FINAL REEL'];
// Curated classics, 1922–1999. Tags describe tone, not a content-safety guarantee.
const MOVIES = [
 ['Nosferatu',1922,'F. W. Murnau',94,'A silent-era vampire brings a plague of shadows to a seaside town.','early bw gothic supernatural creature slow atmospheric lowgore mild serious iconic tragic','#697a65','Animal harm; death; plague imagery'],
 ['Dracula',1931,'Tod Browning',75,'Bela Lugosi’s count welcomes you into the original drawing-room nightmare.','early bw gothic supernatural creature slow atmospheric lowgore mild theatrical iconic mystery','#74516d','Threats; death; predatory behavior'],
 ['Frankenstein',1931,'James Whale',71,'A scientist creates life, and discovers the terrible cost of playing god.','early bw gothic science creature tragic lowgore mild steady theatrical iconic body','#5a7562','Child death; violence; medical imagery'],
 ['Cat People',1942,'Jacques Tourneur',73,'A woman fears that intimacy will awaken an ancient, lethal curse.','early bw supernatural psychological ambiguous slow atmospheric lowgore mild town tragic mystery','#756a47','Stalking; violence; animal peril'],
 ['House on Haunted Hill',1959,'William Castle',75,'Five strangers accept a wealthy host’s invitation to survive a haunted house.','early bw ghost house mystery fun theatrical jolts lowgore mild steady iconic','#716d4b','Suicide themes; skeletons; violence'],
 ['Psycho',1960,'Alfred Hitchcock',109,'A roadside motel becomes the setting for a chilling study of secrets and suspicion.','mid bw killer psychological grounded mystery investigation tense serious iconic moderate medium steady','#78644a','Murder; stabbing; voyeurism'],
 ['The Innocents',1961,'Jack Clayton',100,'A governess suspects her young charges are haunted by something unspeakable.','mid bw ghost house gothic ambiguous psychological slow atmospheric lowgore medium serious mystery','#6c7960','Child peril; death; sexual themes'],
 ['The Haunting',1963,'Robert Wise',112,'Four visitors enter Hill House, where every sound seems to know their names.','mid bw ghost house psychological ambiguous slow atmospheric lowgore medium serious investigation','#566e70','Psychological distress; death'],
 ['Night of the Living Dead',1968,'George A. Romero',96,'Strangers barricade a farmhouse as the dead gather outside.','mid bw creature survival isolated tense serious iconic moderate intense grounded steady showdown','#71805d','Cannibalism; racial violence; child death'],
 ['Rosemary’s Baby',1968,'Roman Polanski',137,'A young mother’s new apartment conceals an increasingly sinister community.','mid color occult psychological house town slow grounded serious intense ambiguous lowgore mystery','#657e58','Sexual assault; pregnancy horror; coercion'],
 ['The Exorcist',1973,'William Friedkin',122,'A mother seeks help when her daughter’s disturbing condition defies explanation.','mid color supernatural possession house serious intense gory slow iconic investigation occult','#626c4a','Child suffering; religious imagery; sexual language'],
 ['The Wicker Man',1973,'Robin Hardy',88,'A missing-child investigation leads a policeman into an island’s pagan traditions.','mid color folk occult isolated investigation mystery slow surreal serious intense lowgore iconic','#a47b35','Nudity; ritual violence; burning'],
 ['The Texas Chain Saw Massacre',1974,'Tobe Hooper',83,'A rural detour strands a group of friends in a relentless waking nightmare.','mid color killer survival isolated grounded intense tense fast moderate serious unstoppable iconic','#9c7144','Extreme menace; implied cannibalism; violence'],
 ['Black Christmas',1974,'Bob Clark',98,'Sinister telephone calls shatter the holidays at a sorority house.','mid color killer house town mystery tense serious moderate intense jolts grounded','#7f504c','Threatening calls; murder; sexual language'],
 ['Jaws',1975,'Steven Spielberg',124,'A police chief, scientist, and fisherman pursue the terror beneath the water.','mid color creature survival isolated tense moderate medium steady iconic showdown wit grounded','#476d77','Shark attacks; blood; child death'],
 ['Carrie',1976,'Brian De Palma',98,'A lonely teenager discovers a terrifying power as prom night approaches.','mid color supernatural psychological town tragic iconic moderate intense slow showdown','#984e49','Bullying; abuse; religious trauma; blood'],
 ['Suspiria',1977,'Dario Argento',99,'A dancer arrives at an academy where vivid beauty masks an occult nightmare.','mid color supernatural occult surreal atmospheric gory intense jolts mystery iconic theatrical','#9e414e','Graphic murders; hanging; flashing imagery'],
 ['Halloween',1978,'John Carpenter',91,'An escaped killer returns to a quiet town on Halloween night.','mid color killer survival town house tense slow iconic medium lowgore serious unstoppable jolts showdown','#a87837','Stalking; stabbing; nudity'],
 ['Alien',1979,'Ridley Scott',117,'A commercial spaceship answers a distress signal and brings something aboard.','mid color creature science cosmic isolated survival tense atmospheric intense gory slow serious iconic body showdown','#657d4d','Body horror; blood; intense peril'],
 ['The Shining',1980,'Stanley Kubrick',146,'An isolated hotel draws a writer and his family into its violent history.','late color ghost psychological house isolated slow atmospheric surreal intense serious iconic ambiguous moderate','#9a653e','Domestic abuse; child peril; blood; nudity'],
 ['The Fog',1980,'John Carpenter',89,'A coastal town’s buried history returns with an unnatural bank of fog.','late color ghost supernatural town atmospheric mystery lowgore medium steady iconic survival','#50767a','Revenge violence; death; peril'],
 ['The Evil Dead',1981,'Sam Raimi',85,'A cabin getaway turns into a frantic battle against an ancient evil.','late color possession supernatural isolated house gory intense fast jolts body occult showdown','#7a7850','Sexual assault by a tree; graphic gore; possession'],
 ['The Thing',1982,'John Carpenter',109,'An Antarctic crew cannot trust anyone after an alien infiltrates their outpost.','late color creature science cosmic body isolated psychological tense gory intense serious ambiguous iconic','#557a94','Graphic transformations; animal harm; blood'],
 ['Poltergeist',1982,'Tobe Hooper',114,'A suburban family’s playful visitors become something far more dangerous.','late color ghost supernatural house town theatrical jolts medium moderate iconic showdown survival','#6d6894','Child peril; frightening faces; disturbing imagery'],
 ['A Nightmare on Elm Street',1984,'Wes Craven',91,'A teenager discovers that her dreams have become a killer’s hunting ground.','late color killer supernatural surreal town house iconic intense moderate jolts unstoppable showdown','#8a4b4c','Bloody deaths; stalking; sexual threats'],
 ['The Return of the Living Dead',1985,'Dan O’Bannon',91,'A warehouse accident unleashes the undead in a riot of punk energy and black humor.','late color creature science town fun wit fast gory intense iconic showdown','#727e46','Gore; nudity; death; strong language'],
 ['The Fly',1986,'David Cronenberg',96,'A scientist’s breakthrough experiment becomes a devastating transformation.','late color science creature body psychological tragic gory intense serious steady iconic','#697d58','Graphic body horror; vomiting; sexual content'],
 ['The Lost Boys',1987,'Joel Schumacher',97,'Two brothers find that their new seaside town has a dangerous nightlife.','late color creature supernatural town fun wit fast moderate medium iconic showdown','#945e7b','Vampire violence; blood; teen peril'],
 ['Evil Dead II',1987,'Sam Raimi',84,'One very unlucky man fights a cabin full of demons with slapstick desperation.','late color possession supernatural isolated house fun wit surreal fast gory intense iconic showdown','#6d824b','Comic gore; dismemberment; demonic imagery'],
 ['The Blair Witch Project',1999,'Daniel Myrick & Eduardo Sánchez',81,'Three student filmmakers venture into the woods to investigate a local legend.','late color folk supernatural isolated grounded ambiguous slow atmospheric intense lowgore serious mystery','#716f42','Sustained distress; strong language; implied violence']
].map(([title,year,director,runtime,description,tags,color,content])=>({title,year,director,runtime,description,tags:tags.split(' '),color,content}));

function rankMovies(answers) {
  return MOVIES.map(movie=>{
    let score=0; const reasons=[];
    QUESTIONS.forEach((q,i)=>{
      const option=q[answers[i]+1];
      if(!option || !option[1]) return;
      const tags=option[1].split(' ');
      if(tags.some(tag=>movie.tags.includes(tag))){score+=1;reasons.push(option[0]);}
    });
    // Explicit comfort preferences take priority over aesthetic matches.
    if(answers[4]===0 && !movie.tags.includes('lowgore')) score-=8;
    if(answers[5]===0 && movie.tags.includes('intense')) score-=9;
    if(answers[5]===1 && movie.tags.includes('intense')) score-=2;
    return {...movie,score,reasons};
  }).sort((a,b)=>b.score-a.score || a.year-b.year);
}

if(typeof document!=='undefined') {
  let step=0, answers=Array(20).fill(null), count=5;
  const $=id=>document.getElementById(id);
  function render(){
    $('step-label').textContent=`ACT ${['I','II','III','IV','V'][step]} — ${ACTS[step]}`;
    $('step-number').textContent=`0${step+1} / 05`;
    $('progress').style.width=`${(step+1)*20}%`;
    $('questions').innerHTML=QUESTIONS.slice(step*4,step*4+4).map((q,j)=>{
      const i=step*4+j;
      return `<fieldset class="question"><legend><span class="qnum">${String(i+1).padStart(2,'0')}</span>${q[0]}</legend><div class="options">${q.slice(1).map((option,k)=>`<label class="option"><input type="radio" name="q${i}" value="${k}" ${answers[i]===k?'checked':''} required><span>${option[0]}</span></label>`).join('')}</div></fieldset>`;
    }).join('');
    $('back').disabled=step===0;
    $('next').innerHTML=step===4?'Find my films <span>↗</span>':'Next act <span>↗</span>';
    $('answered').textContent=`${answers.filter(a=>a!==null).length} of 20 answered`;
    $('error').textContent='';
  }
  function focusStep(){ $('step-label').setAttribute('tabindex','-1'); $('step-label').focus({preventScroll:true}); $('experience').scrollIntoView({behavior:'smooth',block:'start'}); }
  $('survey').addEventListener('change',e=>{
    if(e.target.matches('input[type=radio]')){
      answers[Number(e.target.name.slice(1))]=Number(e.target.value);
      $('answered').textContent=`${answers.filter(a=>a!==null).length} of 20 answered`;
    }
  });
  $('survey').addEventListener('submit',e=>{
    e.preventDefault();
    if(answers.slice(step*4,step*4+4).some(a=>a===null)) { $('error').textContent='Choose an answer for each question to continue.';return; }
    if(step<4){step++;render();focusStep();} else showResults();
  });
  $('back').addEventListener('click',()=>{if(step>0){step--;render();focusStep();}});
  function showResults(){
    const movies=rankMovies(answers).slice(0,count);
    $('experience').hidden=true; $('results').hidden=false;
    $('results').innerHTML=`<img class="results-mascot clipart" src="zombie-head.png" alt="" width="226" height="253"><div class="eyebrow">THE PROJECTIONIST HAS SPOKEN</div><h2 id="results-title" tabindex="-1">Your midnight lineup.</h2><p>Handpicked from ${MOVIES.length} horror classics. Dim the lights. Lock the door.<br>These are taste matches, not content guarantees. Check the notes before pressing play.</p><div class="results-controls"><label for="film-count">Tonight’s lineup</label><select id="film-count">${[3,4,5].map(n=>`<option value="${n}" ${count===n?'selected':''}>${n} films</option>`).join('')}</select></div><div class="movie-grid">${movies.map((m,i)=>`<article class="movie"><div class="poster" style="--poster:${m.color}"><small>FEATURE ${String(i+1).padStart(2,'0')} / ${m.year}</small><strong>${m.title}</strong></div><div class="movie-info"><h3>${m.title}</h3><div class="meta">${m.year} · ${m.runtime} MIN · ${m.director}</div><p>${m.description}</p><p class="reason"><strong>Why it’s on your bill:</strong> ${m.reasons.slice(0,3).join(' · ') || 'A classic to broaden your horizons'}.</p><p><strong>Content notes:</strong> ${m.content}.</p><a href="https://www.imdb.com/find/?q=${encodeURIComponent(m.title+' '+m.year)}&s=tt" target="_blank" rel="noopener noreferrer">Look up this film ↗</a></div></article>`).join('')}</div><div class="results-actions"><button class="back" id="edit">← Edit answers</button><button class="primary" id="restart">Start a new screening ↗</button></div>`;
    $('film-count').addEventListener('change',e=>{count=Number(e.target.value);showResults();});
    $('edit').addEventListener('click',()=>{ $('results').hidden=true; $('experience').hidden=false;render();focusStep(); });
    $('restart').addEventListener('click',()=>{answers=Array(20).fill(null);step=0;count=5;$('results').hidden=true;$('experience').hidden=false;render();focusStep();});
    $('results-title').focus({preventScroll:true});
  }
  render();
}
if(typeof module!=='undefined') module.exports={QUESTIONS,MOVIES,rankMovies};
