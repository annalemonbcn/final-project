export function showError(msgError) {
  document.querySelector('.warn').classList.add('textError');
  document.querySelector('.warn').style.display = 'block';
  document.querySelector('.warn').innerHTML = msgError;
};

export function removeError(){
  document.querySelector('.warn').classList.remove('textError');
  document.querySelector('.warn').style.display = 'none';
  document.querySelector('.warn').innerHTML = '';
};

export function showSuccess(msgSuccess) {
  document.querySelector('.warn').classList.add('textSuccess');
  document.querySelector('.warn').style.display = 'block';
  document.querySelector('.warn').innerHTML = msgSuccess;
}