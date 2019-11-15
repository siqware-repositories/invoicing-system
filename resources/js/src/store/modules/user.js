import axios from  'axios'
const state = {
    users:null
};
const getters = {
    allUsers:(state) =>state.users
};
const actions = {
    async fetchUsers({commit}){
        const response = await axios.post(route('user.list'));
        commit('setUsers',response.data);
    },
    async storeUser({commit},data){
        try {
            const response = await axios.post(route('user.store'),data);
            commit('addUser',response.data);
            return true;
        }catch (e) {
            return false
        }
    },
    async removeUser({commit},id){
        try {
            await axios.delete(route('user.destroy',id));
            commit('removeUser',id);
            return true;
        }catch (e) {
            return false
        }
    },
    async filterUser({commit},e){
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        commit('setUsers',response.data);
    },
    async isCompleteUser({commit},id){
        commit('markUser',id);
    }
};
const mutations = {
    removeUser:function(state,id){
        return state.users = state.users.filter(function (users) {
            return users.id !== id
        })
    },
    setUsers:function(state,users){
        return state.users = users
    },
    addUser:function(state,users) {
        return state.users.unshift(users)
    },
    markUser:(state,id)=>state.users[id].completed = !state.users[id].completed,
};
export default {
    state,
    getters,
    actions,
    mutations,
}