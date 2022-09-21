FROM public.ecr.aws/lambda/nodejs:16 AS builder

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

FROM public.ecr.aws/lambda/nodejs:16

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /app/* ./

CMD [ "app.handler" ]