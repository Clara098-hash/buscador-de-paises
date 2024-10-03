async function consultarDetalhesDoPais() {
  const pegaIdPais = new URLSearchParams(window.location.search);
  const paisId = pegaIdPais.get("id");

  if (!paisId) {
    document.querySelector(".todosPaises").innerHTML = "País não encontrado.";
    return;
  }

  const resposta = await fetch(`https://restcountries.com/v3.1/alpha/${paisId}`);
  const [dadosPais] = await resposta.json();

  mostrarDetalhesDoPais(dadosPais);
}

function mostrarDetalhesDoPais(pais) {
  const detalhesDiv = document.querySelector(".todosPaises");

  detalhesDiv.innerHTML = `
    <div class="pais-detalhes">
      <img width="200" src="${pais.flags.png}" alt="Bandeira de ${pais.name.common}" /> 
      <h2>${pais.name.common}</h2>
      <p><strong>Nome Oficial:</strong> ${pais.name.official}</p>
      <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "N/A"}</p>
      <p><strong>Línguas:</strong> ${Object.values(pais.languages).join(", ")}</p>
      <p><strong>Moeda:</strong> ${Object.values(pais.currencies)[0].name}(${Object.values(pais.currencies)[0].symbol})</p>
      <p><strong>Continente:</strong> ${pais.region}</p>
      <p><strong>População:</strong> ${pais.population.toLocaleString()}</p>
      <p><strong>Área Geográfica:</strong> ${pais.area.toLocaleString()} km²</p>
      <p><strong>Mapa:</strong> <a href="https://www.google.com/maps/@${pais.latlng[0]},${pais.latlng[1]},6z" target="_blank">Abrir no Google Maps</a></p>
    </div>
  `;
}

consultarDetalhesDoPais();
