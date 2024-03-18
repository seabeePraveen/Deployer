This is a application that helps to deploy static web applicatons. This is made using Django, AWS(for hosting), S3/R2 for storage buckets in cloud, redis for cache management.

There are 3 services which serves this full application

## Installation
1. Clone the repository:
  ```shell
  git clone https://github.com/seabeePraveen/Deployer.git
  cd Deployer
  ```
2. Create and activate a virtual environment:
  ```shell
  python3 -m venv venv
  source venv/bin/activate
  ```

3. Install the dependencies:
  ```shell
  pip install -r requirements.txt
  ```

4. Set up the database:
  ```shell
  python manage.py makemigrations
  python manage.py migrate
  ```
5. Run all the three services:
```shell
  python manage.py runserver 0.0.0.0:8000
  cd upload
  python manage.py runserver 0.0.0.0:8001
  cd ../deploy
  python manage.py runserver 0.0.0.0:8002
  ```
## Setup
1. Open browser and goto http://localhost:8001/upload/ and send a POST request with "repoURL" in the body of the repo link and then u will get a unique ID
2. After the repo is uploaded then deploy the application if it is a react/ anyother application by making an POST request to http://localhost:8002/deploy with "uniqueID" and "BaseDir" in the body so that the application will get builded
3. It is recommended to use the linux system for this local setup so that u can work with nginx easily
4. Setup the nginx server at some domain name for example: *.example.com and make an upstream with server http://localhost:8000
5. Now, setup the domain names and sub-domain names in /etc/hosts file to redirect to 127.0.0.1 so that ur project will be running at "uniqueID.example.com"
