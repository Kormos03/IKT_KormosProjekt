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
('0d1208e778cafa9f159870c7e82647c5844352fb907aaa1f8c597864773fd1a6', 1),
('1bf5d0e37ccd1b4f76d659c45092263bcae2695b2514e20a3a1f62ff383e5eff', 1),
('272aa040e0cd56a34ca1a6241a00bb37577a7609951b2bd80ce1c5863b288ae5', 1),
('33c08915f0832879be32e9e62e3fca51eae3e1afbec16d0ce132042f42cafb96', 1),
('38b9961fe9ac4244a42db1ba1208f3be9977870a2f2b21a4b3d38b97717e0500', 1),
('42f1418b936f078ddca6747d018942fe007e2ea6ca33c7ce71912a0c4186d7a6', 1),
('44596e3efaaaddcf6d843f44bd57adff588637488811750097cd20d742b3b46a', 1),
('5b0b030dc128a8f460817d6f7acffb60f0987ff500ee1dc03e8290e6db0644dd', 1),
('6869fff49a23935bc950fdf908f260be309d113bd924ab913db69527c52060ff', 1),
('6ea5659462d18d0a19a7a6b1a1f320d2b39796c33936c34e66ea09da186324f6', 1),
('75633f70cdd941098cd74f639797f166b00bcab5f7ccf41d1ded942a4593a1f9', 1),
('7991d6f85b5d121e907013580c791806901f5a516d42c658a1e08600a4372901', 1),
('85dc88a62a353ce3d3cdaf7b213fe0b73108250e763d90e7ccb0f70b1038723d', 1),
('8aba560e4d61d60b39931428ce93c52e0b14b956cc159b6df1ade379bfd580cb', 1),
('8d46dd1f7c135e11a952962393e13a897a65248ddd9ef507b8f501b17a88fc54', 1),
('c48105c03f333fb999baa6d79f2ae58fecf28f58f59b45c8e1b79d514a98d0d3', 1),
('d8fa8f6d40b3ddbc0ecd8e73611ea4e9987de7da7bf734c733003a12d5f68564', 1),
('da8a78a4d45427b7c0c6e7ae1310597d3f16efad1aae6074073b1a50aae5f20c', 1),
('ed041012ec5d67547115d4a18898e775e48f81680c9fe9b8ec8731a131903bca', 1),
('0c8d952383c595e0afdf4e4a3d612fa3e926eeb2a3e3aaa21cca222cc91ca35e', 2),
('34833c2f3085c0187bc3e16c116f6b7bafc1c8d786625eeb91c98ccb06575093', 2),
('39d3d45bd88134fceb39bd71a2f144aeeb977ae002c0148bd7076e17869710eb', 2),
('3e5ee23b67946ec39c7661553b52ce370c542d1e79d2a4cb17e9b8d33dd24b13', 2),
('3f9256248a4d74e3a4d2dbe6cfcfb6b017b3ceb93844c71b992519b6d6c418b1', 2),
('43bc43de8fe12c61b244c8158ed676488a289c5560fbe045860cdcd0c187d99a', 2),
('5318f3fe8da3bf2776f549152829b96e62d387da875b1c06f4b86ad806aadc75', 2),
('627ce4e3398e21636767035695407d36a121cba900657f2220b62187c6b68749', 2),
('68f76171821e1354aa7e58781e8139cc292419eee6dd93a74bcbf6ec5432ab9d', 2),
('6cc33fcd4eb8ded4194b539a365534f8d0e6f1624833d4f797c9e7569d476f75', 2),
('720bb5ffa5520cba4faacdd8613ee138d9883680b35c43829c024cfe886f3e07', 2),
('82d18ca413a45f782998a0b89b552abc4a8f5b015ff0b381b6ba6bc0b37934cf', 2),
('856e532c9b5df14888382614b6b26d395df2c2ec22c08d7abd54837066d635c0', 2),
('933af7a9ffb4493c8dca431c38675c52482b646e36447f533837ba0b3d041dd2', 2),
('93c5b5b455a76c95801f63362a4554353694f011390075c83655f86ec36d404f', 2),
('9a3d973fc6d46ea6198d40bc7dbdb0909f41d16e01fa3c45fe9a087914187b49', 2),
('a134f1b048e5d0cfe664b5135e097c697b0628866d765c963ae7ce21964c815b', 2),
('a6e677ba0a6fecb7981ebe20ba4e504feab3129423dd1df200de14a20cea7a33', 2),
('a732f93a30fd7b64b578472970e87fdf5d2415c8f1b8537ec74bee7cc9091d28', 2),
('aab5d148945d128708516bf38dc41a76e8db39ede05bc3d5e94dd72412ce2817', 2),
('aad087d3dc5f9319d69fb27fb94138822879e635d0f98346f56738ebde7a3462', 2),
('c03e347113d0e0ed67a24f68b1e43bd1b516d888409ebdf4265d89e9a5738f1e', 2),
('db3fba451301a11d60b5265f258c15a64f16495002d6e0c4f4aa04f10307a8ea', 2),
('e9de49ea24500624073448a2e70c21bea6ab90e64dc8bba6bf31400045facad7', 2),
('ea034335d44173211b549b22af5dbdade0503183b1d1fdd831a96b7725a4f886', 2),
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
