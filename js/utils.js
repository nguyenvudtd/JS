import AppConstants from './appConstants.js';
/// ham tien ich
const truncateTextlength = (text, length) => {
  if (length < 0 || !text) return '';

  const truncatedText = text.length > length
    ? `${text.substring(0, length - 3)}...`
    : text;

  return truncatedText;// do dai chuoi lon hon 3 them dau ... cham sau
};

const formatDate = (dateString) => {
  if (!dateString) return null;

  // Format: HH:mm dd/MM/yyyy
  const date = new Date(dateString);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = `0${date.getDate()}`.slice(-2);// thang 1 chu so va thang 2 chu so, lay 2 so tu cuoi tro nguoc lai
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();

  return `${hour}:${minute} ${day}/${month}/${year}`;
};

const setTextByElementId = (elementId, text) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = text;
  }
};

const setValueByElementId = (elementId, value) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.value = value;
  }
};

const getValueByElementId = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    return element.value;
  }
};

const setBackgroundImageByElementId = (elementId, imageUrl) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.backgroundImage = `url(${imageUrl || AppConstants.DEFAULT_IMAGE_URL})`;
  }
}

const getBackgroundImageByElementId = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const url = element.style.backgroundImage;
    const firstDoubleQuotePosition = url.indexOf("\"");
    const lastDoubleQuotePosition = url.lastIndexOf("\"");
    return url.substring(firstDoubleQuotePosition + 1, lastDoubleQuotePosition);
  }
}

const addClassByElementId = (elementId, classList) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add(...classList);
  }
};

const removeClassByElementId = (elementId, classList) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove(...classList);
  }
};

const utils = {
  truncateTextlength,
  formatDate,
  setTextByElementId,
  setValueByElementId,
  getValueByElementId,
  setBackgroundImageByElementId,
  getBackgroundImageByElementId,
  addClassByElementId,
  removeClassByElementId,
};
export default utils;
