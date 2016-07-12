FROM docker:dind

RUN \
  apk update && \
  apk add nodejs=6.2.0-r0

COPY bin/ /usr/bin/

COPY lib/ /usr/lib/
