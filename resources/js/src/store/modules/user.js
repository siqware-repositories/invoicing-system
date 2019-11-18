import axios from  'axios'
const state = {
    users:[],
    totalUser:null
};
const getters = {
    allUsers:(state) =>state.users,
    totalUser:(state) =>state.users.length,
};
const actions = {
    async fetchUsers({commit}){
        const response = await axios.post(route('user.list'));
        commit('SET_USERS',response.data);
    },
    async storeUser({commit},data){
        try {
            const response = await axios.post(route('user.store'),data);
            commit('ADD_USER',response.data);
            return true;
        }catch (e) {
            return false
        }
    },
    async updateUser({commit},data){
        try {
            const res = await axios.put(route('user.update',data.id),data.data);
            commit('UPDATE_USER',res.data);
            return true;
        }catch (e) {
            return false
        }
    },
    async removeUser({commit},id){
        try {
            await axios.delete(route('user.destroy',id));
            commit('REMOVE_USER',id);
            return true;
        }catch (e) {
            return false
        }
    },
    async editUser({},id){
        try {
            const res = await axios.get(route('user.edit',id));
            return res.data
        }catch (e) {
            return false
        }
    },
    async filterUser({commit},e){
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        commit('SET_USER',response.data);
    }
};
const mutations = {
    REMOVE_USER:function(state,id){
        return state.users = state.users.filter(function (users,index) {
            return users.id !== id
        })
    },
    UPDATE_USER:function(state,data){
        let users = state.users;
        let _index = null;
        users.forEach(function (users,index) {
            if (users.id === data.id) {
                _index = index
            }
        });
        users.splice(_index,1);
        users[_index] = data;
        return state.users = users;
    },
    SET_USERS:function(state,users){
        return state.users = users
    },
    ADD_USER:function(state,users) {
        return state.users.unshift(users)
    }
};
export default {
    state,
    getters,
    actions,
    mutations,
}