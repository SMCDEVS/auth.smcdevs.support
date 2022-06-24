FROM public.ecr.aws/lambda/nodejs:16

COPY . .

RUN mv ./src/* ${LAMBDA_TASK_ROOT}

RUN npm install --only=prod

CMD [ "app.handler" ]