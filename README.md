## make the db manageable and put content 

remove a possible existing db
```bash
php artisan db:wipe
```
make a new one
```bash
php artisan migrate
```
add the admin profile
```bash
php artisan db:seed --class=UserSeeder
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This project is licensed under the [unlicense](https://choosealicense.com/licenses/unlicense/)