var ourRes,abbreviations;

function handleInputText(corpus){
  abbreviations=nlp(corpus).places().text().split("\n");
  abbreviations.forEach(element => {
    let modifiedElement=element.replace(" ","_");
    corpus=corpus.replace(element,modifiedElement);
  });
  let expandedText=nlp(corpus).contractions().expand();
  let ourRes="";

  expandedText.document.forEach(e=>{
    e.forEach(obj=>{
      ourRes+=" "+obj.text;
    })
  })

  return ourRes;
}

doTokenization.addEventListener("click", (e) => {
  e.preventDefault()
  let ourText=handleInputText(corpus.value)
  ourRes=nlp(ourText)
  let tokens=ourRes.sentences().terms().out('array');
  let finalTokens=handleOutputTokens(tokens);
  nlpRes.innerHTML =`<h4>Tokens</h4>[${finalTokens.join("] , [")}]`;
});

doLemmatization.addEventListener("click", (e) => {
  e.preventDefault();
  let ourText=handleInputText(corpus.value)
  const lemmatized= nlp(ourText);
  console.log(lemmatized.nouns().toSingular())
  lemmatized.verbs().toInfinitive()
  let lemmas=lemmatized.sentences().terms().out('array');
  let finalTokens=handleOutputTokens(lemmas);
  nlpRes.innerHTML =`<h4>Lemmas</h4>[${finalTokens.join("] , [")}]`;
});

doStemming.addEventListener("click", (e) => {
  e.preventDefault();
  const tokenizer = new natural.WordTokenizer();
  const stemmer = natural.PorterStemmer;
  const tokens = tokenizer.tokenize(handleInputText(corpus.value));
  const stems = tokens.map(token => stemmer.stem(token));

  let finalTokens=handleOutputTokens(stems);
  nlpRes.innerHTML =`<h4>Stems</h4>[${finalTokens.join("] , [")}]`;
});

function handleOutputTokens(tokens){
  let finalTokens=new Array

  for(let token of tokens){
    token=token.replace("_"," ")
    finalTokens.push(token)
  }
  return finalTokens;
}