async function predictLabel(img) {
  const model = await mobilenet.load();
  return await model.classify(img);
}

async function setPrediction(img) {
  const prediction = await predictLabel(img);

  let outputMarkup = `
    <tr>
      <td><strong> Label </strong> </td>
      <td> <strong> Probability </strong> </td>
    </tr>`;

  prediction.forEach(pred => {
    outputMarkup += `
      <tr>
        <td> ${pred.className} </td>
        <td> ${pred.probability} </td>
      </tr>
      `;
  });

  //DOM manipulation
  document
    .getElementById("predictionTable")
    .setAttribute("style", "display:'inline-block';");

  document.getElementById("predictionTable").innerHTML = outputMarkup;
}

const form = document.getElementById("form");

form.addEventListener("submit", e => {
  e.preventDefault();
  const [file] = document.getElementById("file").files;
  if (!file) {
    alert("Please select a file!");
  } else {
    let imageHolder = document.getElementById("imageHolder");
    imageHolder.innerHTML = `
    <img src="./images/${file.name}" id="img" alt="demopic" />
    `;

    setPrediction(document.getElementById("img"));
  }
});
