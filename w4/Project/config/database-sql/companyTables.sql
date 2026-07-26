-- create tables
        -- user
            CREATE TABLE user (
            id int PRIMARY KEY AUTO_INCREMENT ,
            lastName varchar(255),
            firstName varchar(255),
            companyname varchar(255),
            email varchar(255),
            username varchar(255),
            phone varchar(255),
            password varchar(255)
            );
            -- insert test
            INSERT INTO user ( firstName , lastName , companyname , email , username , phone , password)
            VALUES ('test' , 'test', 'test','test','test','test','test');

        -- ptroduct
            CREATE TABLE product (
            id int PRIMARY KEY AUTO_INCREMENT ,
            name varchar(255),
            category varchar(255),
            userid varchar(255),
            brand varchar(255)
            );  
            -- product test
            INSERT INTO product ( name , category , userid )
            VALUES ('test' , 'test', 'test');

        -- licences
            CREATE TABLE licences (
            id int PRIMARY KEY AUTO_INCREMENT ,
            licenceshash varchar(255),
            expire varchar(255),
            productid varchar(255)
            );  
            -- licences test
            INSERT INTO licences ( licenceshash , expire , productid )
            VALUES ('test' , 'test', 'test');

        -- authorization
            CREATE TABLE authorization (
            id int PRIMARY KEY AUTO_INCREMENT ,
            token varchar(255),
            expire varchar(255),
            ip varchar(255)
            );  
            -- authorization test
            INSERT INTO authorization ( token , expire , ip )
            VALUES ('test' , 'test', 'test');