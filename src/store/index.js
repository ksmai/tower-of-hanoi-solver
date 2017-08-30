import Vue from 'vue';
import Vuex from 'vuex';

import solve from '../utils/solver';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pegs: [
      [1, 2, 3, 4, 5],
      [],
      [],
    ],
    solver: solve(5),
    started: false,
    transitionInterval: 1000,
  },
  getters: {
    nDiscs: state => state.pegs
      .reduce((total, peg) => total + peg.length, 0),
    done: (state, getters) => state.pegs[1].length === getters.nDiscs,
  },
  mutations: {
    reset: (state, { nDiscs }) => {
      const fullPeg = Array(nDiscs).fill().map((e, i) => i + 1);
      Vue.set(state.pegs, 0, fullPeg);
      Vue.set(state.pegs, 1, []);
      Vue.set(state.pegs, 2, []);
      state.solver = solve(nDiscs);
      state.started = false;
    },
    move: (state, { from, to }) => {
      const disc = state.pegs[from].shift();
      state.pegs[to].unshift(disc);
    },
    start: state => state.started = true,
    pause: state => state.started = false,
    updateInterval: (state, { interval }) => {
      state.transitionInterval = interval;
    },
  },
});
