import axios from  'axios'
const state = {
    company:[],
};
const getters = {
    allCompany:(state) =>state.company,
    totalCompany:(state) =>state.company.length,
};
const actions = {
    async updateCompany({},data){
        try {
            await axios.put(route('company.update',data.id),data);
            return true;
        }catch (e) {
            return false
        }
    },
    async editCompany({},id){
        try {
            const res = await axios.get(route('company.edit',id));
            return res.data
        }catch (e) {
            return false
        }
    }
};
const mutations = {
    UPDATE_USER:function(state,data){
        let company = state.company;
        let _index = null;
        company.forEach(function (company,index) {
            if (company.id === data.id) {
                _index = index
            }
        });
        company.splice(_index,1);
        company[_index] = data;
        return state.company = company;
    }
};
export default {
    state,
    getters,
    actions,
    mutations,
}