var express = require('express');
var router = express.Router();
const axios = require('axios').default;



 
/* GET home page. */
router.get('/', function(req, res, next) {

    const config = {
        method: 'get',
        url: 'http://127.0.0.1:8080/buku'
    }
    
    axios(config).then(resp => {
        var data=resp.data.data
        res.render('buku/index', { 
            title: 'Buku',
            data:data,
        });
    });
    
});
 
 
//tamabah
router.get('/tambah', function(req, res, next){    
    res.render('buku/tambah', {title: 'Tambah Buku'});
});
 
// ADD 
router.post('/tambah', function(req, res, next){    
    req.assert('penulis', 'Penulis is required').notEmpty();          
    req.assert('judul', 'Judul is required').notEmpty();       
    req.assert('kota', 'Kota is required').notEmpty();        
    req.assert('penerbit', 'Penerbit is required').notEmpty();
    req.assert('tahun', 'Tahun is required').notEmpty();   
 
    var errors = req.validationErrors();
     
    if( !errors ) {   //No errors were found.  Passed Validation!

        /*
        Using application/x-www-form-urlencoded format
        By default, axios serializes JavaScript objects to JSON. 
        To send data in the application/x-www-form-urlencoded format instead, 
        you can use one of the following options.
        refrensi :https://github.com/axios/axios
        */

        const params = new URLSearchParams();
        params.append('penulis', req.sanitize('penulis').escape().trim());
        params.append('judul', req.sanitize('judul').escape().trim());
        params.append('kota', req.sanitize('kota').escape().trim());
        params.append('penerbit', req.sanitize('penerbit').escape().trim());
        params.append('tahun', req.sanitize('tahun').escape().trim());

        const config = {
            method: 'post',
            url: 'http://127.0.0.1:8080/buku',
            data:params,
        }
        
        axios(config)
        .then(resp => {
            if(resp.data.status=='success'){
                req.flash('success', 'Data added successfully!');
                res.redirect('/buku');
            }else{
                req.flash('error', 'Data not created!');
                res.redirect('/buku');
            }
        })
        .catch(error => {
            req.flash('error', err);         
            res.render('buku/tambah', {
                title: 'Tambah Buku',                  
            });
        });

    }
    else {   //Display errors 
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        });                
        req.flash('error', error_msg);        

        res.render('buku/tambah', { 
            title: 'Buku Tambah',
            data:params,
        });
    }
});
 
// SHOW EDIT  FORM
router.get('/edit/:id', function(req, res, next){
  
    const config = {
        method: 'get',
        url: 'http://127.0.0.1:8080/buku/'+req.params.id,
    }
    
    axios(config).then(resp => {
        var data=resp.data.data
       
        res.render('buku/edit', {
             title: 'Edit Buku', 
             data:data[0],                    
        });
    });
  
});
 
// EDIT POST ACTION
router.post('/update/(:id)', function(req, res, next) {
    var _id= req.params.id;
    req.assert('penulis', 'Penulis is required').notEmpty();          
    req.assert('judul', 'Judul is required').notEmpty();       
    req.assert('kota', 'Kota is required').notEmpty();        
    req.assert('penerbit', 'Penerbit is required').notEmpty();
    req.assert('tahun', 'Tahun is required').notEmpty();   
  
    var errors = req.validationErrors()
     
    if( !errors ) {   
    
        /*
        Using application/x-www-form-urlencoded format
        By default, axios serializes JavaScript objects to JSON. 
        To send data in the application/x-www-form-urlencoded format instead, 
        you can use one of the following options.
        refrensi :https://github.com/axios/axios
        */

        const params = new URLSearchParams();
        params.append('penulis', req.sanitize('penulis').escape().trim());
        params.append('judul', req.sanitize('judul').escape().trim());
        params.append('kota', req.sanitize('kota').escape().trim());
        params.append('penerbit', req.sanitize('penerbit').escape().trim());
        params.append('tahun', req.sanitize('tahun').escape().trim());

        const config = {
            method: 'put',
            url: 'http://127.0.0.1:8080/buku/'+_id,
            data:params,
        }
        
        axios(config)
        .then(resp => {
            if(resp.data.status=='success'){
                req.flash('success', 'Data updated successfully!');
                res.redirect('/buku');
            }else{
                req.flash('error', 'Data not updated!');
                res.redirect('/buku');
            }
        })
        .catch(error => {
            req.flash('error', err);         
            res.render('buku/tambah', {
                title: 'Tambah Buku',                  
            });
        });
         
         
    }
    else {   //Display errors 
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        res.render('buku/edit', { 
            title: 'Edit Buku',            
            data:params,
        });
    }
});
       
// DELETE 
router.get('/delete/:id', function(req, res, next) {
    const config = {
        method: 'delete',
        url: 'http://127.0.0.1:8080/buku/'+req.params.id,
    }
    
    axios(config)
    .then(resp => {
        if(resp.data.status=='success'){
            req.flash('success', 'Data deleted successfully!');
            res.redirect('/buku');
        }else{
            req.flash('error', 'Data not deleted!');
            res.redirect('/buku');
        }
    })
    .catch(error => {
        req.flash('error', err);         
        res.redirect('/buku');
    });
});
 
 
module.exports = router;