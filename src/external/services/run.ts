// const axios = require('axios');
import axios from 'axios';

async function get() {
  const tcbsUri = 'https://athenaaws.tcbs.com.vn/athena/v1';
  const pokeUri = 'https://pokeapi.co/api/v2';
  // const res = await axios.get(`${tcbsUri}/worldIndexes`)
  const res = await axios.get(`${pokeUri}/pokemon/1`);
  console.log('🚀 ~ file: run.js:8 ~ get ~ res', res?.data);
}

get();
