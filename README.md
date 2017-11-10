cc1-tracks
===================================================

## What does this app do?
This Application is the frontend for the CloudComputing-Projekt "????"

## Tech Stack
### Required Tools
* [aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* [npm](https://www.npmjs.com/)
* [angular-cli](https://github.com/angular/angular-cli)


## AWS Setup
##### Install the required tools
* Create an AWS account
* [Install NodeJS](https://nodejs.org/en/download/)
* [Install or update your aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) 
* Install angular-cli </br>
   ``npm install -g @angular/cli``


## Getting the code and running it locally
_This uses the pre-configured AWS resources hosted by AWS_

```
# Clone it from github
git clone https://github.com/Wodkalemon/cc1-tracks.git
```
```
# Install the NPM packages
cd cc1-tracks
npm install
```
```
# Run the app local
ng serve
```

## Creating AWS Resources
This application will be deployed and hosted as a static application on S3.
The following Resources are necessary to run the application:
* S3
* Cognito
* JSON-APIs with backen Operations

### Creating S3 Bucket
```
# creates a bucket
aws s3 mb s3://$BUCKET_NAME/ --region $REGION

# Add the ‘website’ configuration
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document index.html  --region $REGION

# Add the bucket policy to make it public readable
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:aws/s3-bucket-policy.json  --region $REGION
```

### Creating Cognito
see aws/createResources.sh

### _S3:_ Update, Build and Deploy
```
# Build the project and sync the output with the S3 bucket
ng build
cd dist
aws s3 sync . s3://[BUCKET_NAME]/
```
