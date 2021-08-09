set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "comments" (
    "commentId" serial NOT NULL,
    "drawingId" integer NOT NULL,
    "userId" integer NOT NULL,
    "commentText" TEXT NOT NULL,
    CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "drawings" (
    "drawingId" serial NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "drawing" TEXT NOT NULL,
    CONSTRAINT "drawings_pk" PRIMARY KEY ("drawingId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "drawingLikes" (
    "drawingId" integer NOT NULL,
    "userId" integer NOT NULL,
    "liked" BOOLEAN NOT NULL,
    CONSTRAINT "drawingLikes_pk" PRIMARY KEY ("drawingId","userId")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("drawingId") REFERENCES "drawings"("drawingId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "drawings" ADD CONSTRAINT "drawings_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "drawingLikes" ADD CONSTRAINT "drawingLikes_fk0" FOREIGN KEY ("drawingId") REFERENCES "drawings"("drawingId");
ALTER TABLE "drawingLikes" ADD CONSTRAINT "drawingLikes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
