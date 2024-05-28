-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 22, 2024 at 08:01 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kormosDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `AdminToken`
--

CREATE TABLE `AdminToken` (
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `AdminToken`
--

INSERT INTO `AdminToken` (`token`, `userId`) VALUES
('00f2d8e6b660b8b6f1b3ae1cb422c3b2d8ff19230b1e60bfe308c53edbc187a1', 2),
('20fe62d6e3f109e7b7ca5c60ddbe564faf9c7a7a24eebb1ac9418d901e464e0b', 2),
('298eac54e84c53e7d7bb7127e1fa3e097fb060407d3f8b3605508aca1df5342b', 2),
('2e232688e7bd98069fc873cb7b5174bab7bb8f15f0388d83604b63f0f755d878', 2),
('2f30b2bc561088359937b76e7d4ff83f3153c7017b3a268af80cebf06a972cb7', 2),
('41bbec3319ab0e81abe1c274af67550113174fd0f02765bc46c4f016db053997', 2),
('4640d68e6602b0b938a37d4cea62fe29db68876aae84cb4af4014ca322a0349f', 2),
('4b0ddf4d4c22fe1dddf780751a6666706bf3444f192439bd590eee6f83417cc5', 2),
('5bc9041f0574a885a53f2d4ee7dacb7cd4a5b6d072965cadc9852470b7bf271b', 2),
('60af0fac6dfd7c5a37ccf87d3f6889fc13fce362c49b637a88b63e345fc1bd1f', 2),
('63d507f395f43c89f2049eadcea769d5260c8d23d90eaee41b8dcb83825a88bf', 2),
('7a834f176b0dd57d3b30f999a5edb314a02789c32f9ebc5c18674e336835cf52', 2),
('815d3a12a874c50a00fc659a6ba194eae657bb1990aaa39ebc7e31286ed80eb6', 2),
('948f4b3b046e9957837d8087e2076426bad31970a7f8228ccce75fd29cfd4560', 2),
('b9033d79f244328ed633e86b7988716b14a2baca7ad443ab15420c0061085796', 2),
('be8d298b0e7d4f90324ce8c3a9d698cc3cdd7fbe38fe7a279545566479d3899b', 2),
('c03b63fb758ccb9098296ba88e441423d5635b8b0ce3da7bcbb5959f75564ba7', 2),
('c222df24ea9ea1bc63fe46736997f98f0165d15cf3e5ecc321c962bb074ee1f6', 2),
('cbdf6e4f2315bed86575ba68c3c0bdf2fa2b1fe06b8bc785abeda6c325e24009', 2),
('cc6f61e9d8768d0a1226792b02bccd2ac47015b7c8d9afb2357a0e9245be0b2c', 2),
('d0e8980f883e6b23ce8fcf2e5ccdda012c35879b950b8ecb7aa25cc386ca8846', 2),
('d5d2ad00999da0f9995f75c157e4e19303f1cdc0d9e1f56a0339a28efca55c31', 2),
('dbc944e4d8fae95d315dd08e43c906f78edf99969c78a65bf83073649977c55f', 2),
('de1759ac60d31d5bf43dbac4fa1be2435ead1a8cc59ee9a068d9b64b74bf4fa4', 2),
('eb988708eab74237c69232a00cda6330192a33c1210992b50596f91e0c8ece07', 2),
('ee7a2b29d8615b80a13f104cf4b4dad35f37a1921a180c63a70709596a2bde6c', 2),
('ef70ad33a1bc18c6f58956b147356c97ff16f86ab48254e2567e45b53a873035', 2),
('fbf116f9383f3a7dba6a35bca2f84ec5c1b6520984568306686ac49d4a70077b', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Images`
--

CREATE TABLE `Images` (
  `id` int NOT NULL,
  `url` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Images`
--

INSERT INTO `Images` (`id`, `url`, `name`) VALUES
(15, 'http://localhost:3000/images/0.jpeg', '0'),
(17, 'http://localhost:3000/images/2.jpeg', '2'),
(19, 'http://localhost:3000/images/4.jpeg', '4'),
(27, 'http://localhost:3000/images/5.jpeg', '5');

-- --------------------------------------------------------

--
-- Table structure for table `Not_Reserved`
--

CREATE TABLE `Not_Reserved` (
  `id` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateStart` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dateEnd` datetime(3) NOT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `extra` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Not_Reserved`
--

INSERT INTO `Not_Reserved` (`id`, `name`, `dateStart`, `dateEnd`, `type`, `extra`) VALUES
(588, 'aronkormosAfarmos', '2024-04-30 12:24:00.000', '2024-04-30 12:54:00.000', '', 0),
(589, 'aronkormosAfarmos', '2024-04-30 12:54:00.000', '2024-04-30 13:24:00.000', '', 0),
(590, 'aronkormosAfarmos', '2024-04-30 13:24:00.000', '2024-04-30 13:54:00.000', '', 0),
(592, 'aronkormosAfarmos', '2024-04-30 20:54:00.000', '2024-04-30 21:24:00.000', '', 0),
(593, 'aronkormosAfarmos', '2024-04-30 15:54:00.000', '2024-04-30 16:24:00.000', '', 0),
(594, 'aronkormosAfarmos', '2024-04-30 16:24:00.000', '2024-04-30 16:54:00.000', '', 0),
(595, 'aronkormosAfarmos', '2024-04-30 18:54:00.000', '2024-04-30 19:24:00.000', '', 0),
(596, 'aronkormosAfarmos', '2024-04-30 15:24:00.000', '2024-04-30 15:54:00.000', '', 0),
(597, 'aronkormosAfarmos', '2024-04-30 18:24:00.000', '2024-04-30 18:54:00.000', '', 0),
(598, 'aronkormosAfarmos', '2024-04-30 21:24:00.000', '2024-04-30 21:54:00.000', '', 0),
(599, 'aronkormosAfarmos', '2024-04-30 19:54:00.000', '2024-04-30 20:24:00.000', '', 0),
(600, 'aronkormosAfarmos', '2024-04-30 13:54:00.000', '2024-04-30 14:24:00.000', '', 0),
(601, 'aronkormosAfarmos', '2024-04-30 17:24:00.000', '2024-04-30 17:54:00.000', '', 0),
(602, 'aronkormosAfarmos', '2024-04-30 20:24:00.000', '2024-04-30 20:54:00.000', '', 0),
(603, 'aronkormosAfarmos', '2024-04-30 14:24:00.000', '2024-04-30 14:54:00.000', '', 0),
(604, 'aronkormosAfarmos', '2024-04-30 19:24:00.000', '2024-04-30 19:54:00.000', '', 0),
(605, 'aronkormosAfarmos', '2024-04-30 14:54:00.000', '2024-04-30 15:24:00.000', '', 0),
(606, 'aronkormosAfarmos', '2024-04-30 17:54:00.000', '2024-04-30 18:24:00.000', '', 0),
(607, 'aronkormosAfarmos', '2024-04-30 16:54:00.000', '2024-04-30 17:24:00.000', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Reserved`
--

CREATE TABLE `Reserved` (
  `id` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateStart` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dateEnd` datetime(3) NOT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `extra` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Token`
--

CREATE TABLE `Token` (
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Token`
--

INSERT INTO `Token` (`token`, `userId`) VALUES
('f172ddb8e54cf41f7236dc8c0eaab0f4ac7fbd48fea59aaad6a5786d3808997e', 2);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `name`, `password`, `email`, `admin`) VALUES
(1, 'user', '$argon2i$v=19$m=16,t=2,p=1$cWxvSGxwZXJZemlLejNpZg$lv25tm23gKETvBe6aGBGtw', 'user@email.com', 0),
(2, 'admin', '$argon2i$v=19$m=16,t=2,p=1$UTFIR3FlUHpTcGlLVnF0aQ$E/aPIh9/qob04omPmpopfg', 'admin@email.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('4ab60d35-07b1-476d-b5ff-bf4b8c3cc9aa', '3619eead2a145f5d5da6540d83c77eec45624a7793bf33e80fe993f302ec7faf', '2024-04-10 17:11:54.149', '20240410171153_added_unique_filters_for_dates', NULL, NULL, '2024-04-10 17:11:54.001', 1),
('8c8e5b28-a626-45b9-b038-9620b7ad0c0e', 'ce9b02d18978f784f8e911ab60f02291960cfce634c816245cf97d4beb9d6539', '2024-04-09 19:35:37.376', '20240409193537_defaultdb', NULL, NULL, '2024-04-09 19:35:37.140', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AdminToken`
--
ALTER TABLE `AdminToken`
  ADD PRIMARY KEY (`token`),
  ADD KEY `AdminToken_userId_fkey` (`userId`);

--
-- Indexes for table `Images`
--
ALTER TABLE `Images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Images_name_key` (`name`);

--
-- Indexes for table `Not_Reserved`
--
ALTER TABLE `Not_Reserved`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Not_Reserved_dateStart_dateEnd_key` (`dateStart`,`dateEnd`);

--
-- Indexes for table `Reserved`
--
ALTER TABLE `Reserved`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Reserved_dateStart_dateEnd_key` (`dateStart`,`dateEnd`);

--
-- Indexes for table `Token`
--
ALTER TABLE `Token`
  ADD PRIMARY KEY (`token`),
  ADD KEY `Token_userId_fkey` (`userId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Images`
--
ALTER TABLE `Images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `Not_Reserved`
--
ALTER TABLE `Not_Reserved`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=608;

--
-- AUTO_INCREMENT for table `Reserved`
--
ALTER TABLE `Reserved`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AdminToken`
--
ALTER TABLE `AdminToken`
  ADD CONSTRAINT `AdminToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Token`
--
ALTER TABLE `Token`
  ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
