CREATE TABLE `actors_to_films` (
	`actor_id` integer NOT NULL,
	`film_id` integer NOT NULL,
	PRIMARY KEY(`actor_id`, `film_id`),
	FOREIGN KEY (`actor_id`) REFERENCES `actors`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `actors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `films` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `actor_idx` ON `actors_to_films` (`actor_id`);--> statement-breakpoint
CREATE INDEX `film_idx` ON `actors_to_films` (`film_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `films_name_unique` ON `films` (`name`);