const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', function (req, res) {
    
    // config for your database
    var config = {
        user: 'CESReader',
        password: 'DZCES#',
        database: 'ORACLEHCM',
        server: '10.132.49.9',
        
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        },
    };
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(`select * from ORACLEHCM.dbo.vw_Ascendion_Circle_Info`, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset.recordsets);
        });
    });
});

module.exports = router; 