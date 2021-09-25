const menuBtn = document.querySelector('.menu i');
const menuContent = document.querySelector('.menu-content');

menuBtn.addEventListener('click', function() {
  //OPÇÃO RUIM
  // if (menuContent.classList.contains('show')) {
  //   menuContent.classList.remove('show')
  // } else {
  //   menuContent.classList.add('show')
  // }

  //OPÇÃO BOA
  menuContent.classList.toggle('show')
  
  if (menuBtn.classList.contains('fa-bars')) {
      menuBtn.classList.remove('fa-bars')
      menuBtn.classList.add('fa-times')
    } else {
      menuBtn.classList.remove('fa-times')
      menuBtn.classList.add('fa-bars')
    }
})

const cepInput = document.querySelector('#cep');
const logradouroInput = document.querySelector('#logradouro');
const bairroInput = document.querySelector('#bairro');
const localidadeInput = document.querySelector('#localidade');
const ufInput = document.querySelector('#uf');

function cepMask(cep){
  return cep
    .replace(/\D/g,"")
    .replace(/^(\d{5})(\d)/,"$1-$2");
    // .replace(/^(\d{2})(\d)/,"$1.$2")
}

function cepUnmask(cep) {
  return cep
    .replace("-", "")
    // .replace(/\-/g, "")
}

cepInput.addEventListener('input', function() {
  cepInput.value = cepMask(cepInput.value)
  if(cepInput.value.length === 9){
    axios.get(`https://viacep.com.br/ws/${cepInput.value}/json/`)
      .then(response => {
        logradouroInput.value = response.data.logradouro
        bairroInput.value = response.data.bairro
        localidadeInput.value = response.data.localidade
        ufInput.value = response.data.uf
      });
  }
})