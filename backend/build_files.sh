echo " BUILD START "
echo "Building the project..."
python3.9 -m pip install -r requirements.txt
pip install pymysql
pip install dj_database_url

echo "Make Migration..."
python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

echo "Collect Static..."
python3.9 manage.py collectstatic --noinput --clear
echo " BUILD END "
