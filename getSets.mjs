const res = await fetch('https://api.pokemontcg.io/v2/sets');
const data = await res.json();

data.data.forEach(set => {
  console.log(`${set.id}: ${set.name}`);
});
