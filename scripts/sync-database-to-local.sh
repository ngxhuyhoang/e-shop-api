# Backup
# Lấy Database từ Host về local và ghi vào file e_commerce_dev_backup.sql
docker exec messages-database sh -c 'exec mysqldump --databases eshop_database -uhoang -p12345678 -hvps.ngxhuyhoang.com --no-tablespaces --verbose' > eshop_database_backup.sql
# docker exec messages-database sh -c 'exec mysqldump --databases eshop_database -uhoang -p12345678 --no-tablespaces --verbose' > eshop_database_backup-2.sql


# Restore
docker exec -i messages-database sh -c 'exec mysql -uroot -p12345678 --database eshop_database --verbose' < eshop_database_backup.sql
# docker exec -i messages-database sh -c 'exec mysql -uhoang -p12345678 -hvps.ngxhuyhoang.com --database eshop_database --verbose' < eshop_database_backup-2.sql
