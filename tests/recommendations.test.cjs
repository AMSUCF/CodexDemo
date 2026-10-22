const {test}=require('node:test');
const assert=require('node:assert/strict');
const {QUESTIONS,MOVIES,rankMovies}=require('../app.js');

test('survey has twenty usable questions and catalog has complete unique films',()=>{
  assert.equal(QUESTIONS.length,20);
  QUESTIONS.forEach(q=>{assert.equal(q.length,4);q.slice(1).forEach(o=>assert.equal(o.length,2));});
  assert.equal(MOVIES.length,30);
  assert.equal(new Set(MOVIES.map(m=>m.title)).size,30);
  MOVIES.forEach(m=>{assert.ok(m.content && m.description && m.director && m.runtime>0 && m.tags.length);});
});
test('different tastes produce different ranked lineups',()=>{
  const gentle=rankMovies(Array(20).fill(0));
  const energetic=rankMovies(Array(20).fill(2));
  assert.notDeepEqual(gentle.slice(0,5).map(m=>m.title),energetic.slice(0,5).map(m=>m.title));
  assert.ok(gentle.slice(0,5).every(m=>m.tags.includes('lowgore') && !m.tags.includes('intense')));
});
test('all preference combinations produce finite scores and unique 3–5 film results',()=>{
  for(let seed=0;seed<100;seed++){
    const answers=Array.from({length:20},(_,i)=>(seed*7+i*i+Math.floor(seed/(i+1)))%3);
    const ranked=rankMovies(answers);
    assert.ok(ranked.every(m=>Number.isFinite(m.score)));
    for(const count of [3,4,5]) assert.equal(new Set(ranked.slice(0,count).map(m=>m.title)).size,count);
    assert.deepEqual(ranked,rankMovies(answers));
  }
});
