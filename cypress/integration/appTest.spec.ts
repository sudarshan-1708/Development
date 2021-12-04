describe('testing API endPoints', ()=>{

    // it('it should return users from database',()=>{
    //     cy.request('http:localhost:3000/users/1').then((res)=>{
    //         expect(res.body).has.property('firstName','Sudarshan')
    //     })
    // });

    it('should authenticate the user if user is valid',()=>{
        cy.login('Sudarshan','shukla@123')
    })

    it('should get users data present in database',()=>{
        cy.getUsers();
    })

    it('get Users details via ID',()=>{
        cy.getUserById('1')
    })

    // it('should add new user to data base',()=>{
    //     cy.addUser('Pranjal','Dubey','pp@gmail.com',91976576871,'Varanshi','UP','India','ppNotSecure')
    // })

    it('update Users details via ID',()=>{
        cy.updateById('2','Raja','Babu')
    })

    it('should delete the user by Id',()=>{
        cy.deleteUser('2')
    })

})