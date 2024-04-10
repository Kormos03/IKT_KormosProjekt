/*
  Warnings:

  - A unique constraint covering the columns `[dateStart,dateEnd]` on the table `Not_Reserved` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dateStart,dateEnd]` on the table `Reserved` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Not_Reserved_dateStart_dateEnd_key` ON `Not_Reserved`(`dateStart`, `dateEnd`);

-- CreateIndex
CREATE UNIQUE INDEX `Reserved_dateStart_dateEnd_key` ON `Reserved`(`dateStart`, `dateEnd`);
