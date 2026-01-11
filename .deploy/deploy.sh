cd ~
cd ..
cd big-react-app
git pull origin main
npm run build:prod
cd ..
rm -rf /var/www/big-react-app/html
mv big-react-app/build /var/www/big-react-app/html