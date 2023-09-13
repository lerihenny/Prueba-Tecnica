import axios from "axios";
import * as cons from './constants';

export async function getVinos() {
  try {
    const res = await axios.get(cons.vinos);
    return res.data;
  }
  catch(err) {
    return err;
  }
}

export async function getTipos() {
  try {
    const res = await axios.get(cons.tipos);
    return res.data;
  }
  catch(err) {
    return err;
  }
}

export async function getVariedad() {
  try {
    const res = await axios.get(cons.variedad);
    return res.data;
  }
  catch(err) {
    return err;
  }
}

export async function loginData(json) {
  try {
    const res = await axios.post(cons.login, json, function(resp){});
    return res;
  }
  catch(err) {
    return err;
  }
}

export async function signupData(json) {
  try {
    const res = await axios.post(cons.signup, json, function(resp){});
    return res;
  }
  catch(err) {
    return err;
  }
}

export async function eliminarVino(json) {
  try {
    const res = await axios.post(cons.eliminar, json, function(resp){});
    return res;
  }
  catch(err) {
    return err;
  }
}

export async function registrarVinos(json) {
  try {
    const res = await axios.post(cons.registrar, json, function(resp){});
    return res;
  }
  catch(err) {
    return err;
  }
}
