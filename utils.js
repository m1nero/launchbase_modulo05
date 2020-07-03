module.exports = {
    age: function(timestamp) {
        const today = new Date();
        const bithDate = new Date(timestamp);
    
        let age = today.getFullYear() - bithDate.getFullYear();
    
        const month = today.getMonth() - bithDate.getMonth();
    
        if (month <= 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }
        return age;
    }
}