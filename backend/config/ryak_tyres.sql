-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2025 at 08:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ryak_tyres`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `readStatus` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`id`, `name`, `email`, `subject`, `message`, `readStatus`, `created_at`) VALUES
(2, 'M.G. Hasindu Thirasara', 'hasinduthirasaramg@gmail.com', 'test', 'hiiiiiiiiiiiiiiiiiiiii', 0, '2025-04-23 17:53:54'),
(3, 'xvcbvnmhbj,n', 'dxfcbgnvhm@gmail.com', 'dxfcgnvhmbjn', 'dxgfchgjvhkbnk', 1, '2025-05-02 05:59:38'),
(4, 'Sugath Siriwardana', 'sugith@gmail.com', 'test', 'test', 0, '2025-05-09 18:20:29');

-- --------------------------------------------------------

--
-- Table structure for table `customer_payments`
--

CREATE TABLE `customer_payments` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(25) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `delivery_fee` decimal(10,2) NOT NULL,
  `net_amount` decimal(10,2) NOT NULL,
  `note` varchar(50) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `order_id` int(11) NOT NULL,
  `customer_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_payments`
--

INSERT INTO `customer_payments` (`id`, `customer_name`, `amount`, `delivery_fee`, `net_amount`, `note`, `payment_date`, `payment_method`, `order_id`, `customer_ID`) VALUES
(8, '', 455.00, 400.00, 8855.00, 'vgvg', '2025-04-24', 'Bank Transfer', 30, 16),
(9, '', 500.00, 450.00, 5950.00, 'test', '2025-05-11', 'Credit Card', 7, 16),
(10, '', 7000.00, 500.00, 8000.00, 'test', '2025-05-11', 'Credit Card', 32, 16),
(11, '', 5000.00, 499.00, 10499.00, 'test', '2025-05-11', 'Credit Card', 40, 43);

-- --------------------------------------------------------

--
-- Table structure for table `customer_register`
--

CREATE TABLE `customer_register` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `phone1` varchar(15) NOT NULL,
  `phone2` varchar(15) DEFAULT NULL,
  `houseName` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_register`
--

INSERT INTO `customer_register` (`id`, `firstName`, `lastName`, `nic`, `phone1`, `phone2`, `houseName`, `city`, `state`, `email`, `password`) VALUES
(16, 'tharushika', 'hirushani', '200235703157', '0717517940', '0715599044', 'tharu house', 'colombo', 'thalawathugoda', 'tha@gmail.com', '$2a$10$S3LLgmt2z70/R03nf9pILOn1wJE891IGgoDvk6xI4x2Wh3whxy/pG'),
(43, 'Sashika', 'Prabath', '200235698745', '0718866041', '0714265987', 'pabasara', 'south kaluthara', 'samagi mawatha', 'shashika@gmail.com', '$2a$10$EBGTraGYcjprNGqsjKvCxerA82MZUEAZFh4HD5qMUljgrTSomxD2y'),
(44, 'Hasindu', 'Thirasara', '200235703151', '0717517940', '0715599047', 'SATHUTA', 'matara', 'yatiyana', 'hasinduthirasara@gmail.com', '$2a$10$9VFLTg5SkZhBNtiC66aKtOlp4aOspQea5UABMk2HJuT4einoBg9kq');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `product_id` int(10) NOT NULL,
  `supplier_id` int(10) NOT NULL,
  `stock` int(11) NOT NULL,
  `quantity` int(10) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `product_id`, `supplier_id`, `stock`, `quantity`, `amount`, `date`) VALUES
(4, 9, 16, 200, 200, 50000.00, '2025-05-08 10:35:10'),
(7, 10, 18, 4500, 4500, 35000.00, '2025-05-08 14:00:06'),
(12, 7, 16, 5000, 5000, 8000.00, '2025-05-08 17:15:41'),
(13, 7, 16, 500, 500, 500000.00, '2025-05-08 17:20:16'),
(14, 7, 18, 50, 50, 4500.00, '2025-05-08 17:25:18'),
(16, 7, 18, 12, 12, 786.00, '2025-05-11 16:21:35');

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` int(11) NOT NULL,
  `notice` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`id`, `notice`, `created_at`) VALUES
(2, 'hi oyalata 20% discount ekak thiye', '2025-02-28 11:59:19'),
(6, 'test', '2025-05-11 15:22:16');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `progress` int(11) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `payment_status` varchar(10) NOT NULL,
  `service_id` varchar(10) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `own_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `progress`, `order_date`, `total_amount`, `status`, `payment_status`, `service_id`, `emp_id`, `own_ID`) VALUES
(7, 100, '2025-04-07', 5000.00, 'Completed', 'Paid', 'RD_00004', 22, 10),
(30, 100, '2025-06-15', 8000.00, 'Completed', 'Paid', 'RP_00008', 21, 10),
(31, 100, '2025-04-17', 855.00, 'Completed', 'Paid', 'RD_00011', 20, 10),
(32, 100, '2025-04-24', 500.00, 'Completed', 'Paid', 'RD_00012', 22, 10),
(33, 22, '2025-04-24', 44.00, 'In Progres', 'not paid', 'RD_00013', 21, 10),
(37, 12, '2025-04-30', 5000.00, 'In Progres', 'not paid', 'RP_00009', 21, 10),
(40, 100, '2025-04-04', 5000.00, 'Completed', 'Paid', 'RP_00012', 21, 10),
(41, 15, '2025-05-10', 5000.00, 'In Progres', 'not paid', 'RD_00014', 29, 10),
(42, 17, '2025-05-10', 7000.00, 'In Progres', 'not paid', 'RD_00015', 28, 10),
(43, 13, '2025-05-10', 8000.00, 'In Progres', 'not paid', 'RD_00016', 28, 10),
(46, 16, '2025-05-12', 7500.00, 'In Progres', 'not paid', 'RD_00017', 21, 10);

-- --------------------------------------------------------

--
-- Table structure for table `our_products`
--

CREATE TABLE `our_products` (
  `id` int(11) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `description` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `owner_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `our_products`
--

INSERT INTO `our_products` (`id`, `productName`, `description`, `price`, `image`, `owner_id`) VALUES
(3, 'sdfghjk', 'sdfghj', 325500.00, '/uploads/1741364282834-439580507-WhatsApp Image 2024-08-31 at 14.02.01_48389556.jpg', 1),
(4, 'ggg', 'gg', 444.00, '/uploads/1746374689405-377922429-Untitled design (3).png', 10),
(6, 'gg', 'gg', 88.00, '/uploads/1746374784110-206925604-Untitled design.png', 10);

-- --------------------------------------------------------

--
-- Table structure for table `owner_register`
--

CREATE TABLE `owner_register` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owner_register`
--

INSERT INTO `owner_register` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES
(1, 'M.G.', 'Thirasara', 'thira@gmail.com', '$2a$10$jCOakqlYgAe0cOFFtOckX.jHxepa4HhFhSMvP4WkhJoJSiROoDt0O'),
(2, 'tharu', 'hiru', 'hiru@gmail.com', '$2a$10$Vg1XR3N09K.k1dkQ1MS0HOSiMVrErzT3PrQ269OwpRO6pXQPy.cdS'),
(3, 'kavi', 'Thirasara', 'kavi@gmail.com', '$2a$10$CDk/oYhGULvVI4jZlEYxwOpdV7cqbYIYHCBdP0nVbcFQpL6uiQDvW'),
(4, 'prasan', 'malintha', 'prasan@gmail.com', '$2a$10$FxGORgdffGWat1HjYSIrv.KiZrgpjxAI1ne/nAsNR819bzKX.nE8i'),
(5, 'kavishi', 'frenando', 'kavishi@gmail.com', '$2a$10$CJUDrMh83NxgoFgfTWaFsefxJVQS4i2OUmkSL2jFNwGO9VBsQLxl2'),
(6, 'sunali', 'sunali', 'suna@gmail.com', '$2a$10$.ENkKMvEdPcSShyLAFIFnuW5RVGrLAnv/MfpIJO0smCNhVuBgz2Vy'),
(7, 'hashan', 'dd', 'hash@gmail.com', '$2a$10$qwcRsLhNkUaAgr.VEAgpVON25xv44axN9FeNWcJW7ePJJYoqhTa4C'),
(8, 'navindu', 'akalpa', 'navi@gmail.com', '$2a$10$qRMfro.Spaykg1gpBf0UXeITzm1yWVT06Dm8sL2oeqGfsyZPXDHve'),
(9, 'suba', 'suna', 'suba@gmail.com', '$2a$10$IxBYlDi4OmWlYE5L6VJPRebpwNXCXxNy4L2/g8J5x/V.v.N76czXq'),
(10, 'test', 'test', 'test@gmail.com', '$2a$10$umMl3cT0O.x9OQ2kh3pZt.MweMjiVY9Pi43Ugym.GbJxqp40StKaq'),
(13, 'sajini', 'oshadee', 'ddddd@gmail.com', '$2a$10$CmQGAKpf0cbR2Y6uGm8o/..CGqjjOe.5pfOcuMVqyLZ0HvHAmX5kG'),
(24, 'ssss', 'ssss', 'dddd@gmail.com', '$2a$10$sk0Gpn8rfVWtEaVgYk67mOgJUeja34RiQT/quLnSwiUJn4.5GnTry'),
(25, 'hiii', 'hii', 'hiii@gmail.com', '$2a$10$3/x9Ckb3LEw05eTR/1UEGeEBq1LtYx18XAMN3gKV93VEbUxxb0jTK'),
(26, 'mmm', 'mmmm', 'mmm@gmail.com', '$2a$10$CmobefXzrJEsj945bMnMEOWrj/Rq.DasmuLaYoFKFF2gsT92n6H16'),
(34, 'zzzz', 'zzzz', 'hiiic@gmail.com', '$2a$10$oPnJLoKYb5Awrnz89DHMleVwUZt7OGswTejXk9d8TWEpBIj/20W16'),
(39, 'M.G.', 'Thirasara', 'twest@gmail.com', '$2a$10$yERWgm3xch0wDvuFtOUKg.CJuSIqlE0N30Lg4ugD5EOULcPNMtI.S');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `stock`) VALUES
(6, ' cushion gum', 'Uncured rubber layer that bonds tread rubber to th', 25),
(7, 'Pre-cured Tread Rubber', '	Vulcanized rubber strips molded with tread patter', 72),
(8, 'Uncured Tread Rubber', '	Soft, pliable rubber compound; shaped and cured d', 2),
(9, 'Bonding Cement', 'Chemical adhesive (solvent-based or rubber-based) ', 40),
(10, 'Envelope Rubber', '	Elastic rubber cover used to wrap around the tyre', 20),
(11, 'Liner Rubber Sheet', '	Thin uncured rubber sheet used to cover buffed ty', 8),
(12, 'Sidewall Veneer', 'Rubber used to restore or replace sidewall appeara', 5),
(13, 'Vulcanizing Solution', '	Adhesive that activates when heated, allowing rub', 15),
(14, 'Release Agents', 'Applied to prevent rubber from sticking to molds o', 20),
(15, 'Radial Repair Patches', '	Reinforced patches designed for radial tyre const', 25),
(16, 'Bias Repair Patches', 'Patches suitable for bias-ply tyres; offer flexibi', 16),
(17, 'Mushroom Plug / Plug Stem', 'Rubber stem with patch cap used for puncture repai', 28),
(18, 'Filler Rubber (Extruder Rope Rubber)', 'Soft, uncured rubber used to fill skived or gouged', 32),
(19, 'Inner Liner Sealer', 'Liquid or paste applied to restore air-tightness i', 42),
(20, 'Vulcanizing Cement', 'Adhesive compound that initiates the vulcanization', 14),
(23, 'Talcum Powder', 'Dusting agent to prevent uncured rubber from stick', 3);

-- --------------------------------------------------------

--
-- Table structure for table `reject_orders`
--

CREATE TABLE `reject_orders` (
  `reject_id` int(11) NOT NULL,
  `service_id` varchar(20) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `note` varchar(55) NOT NULL,
  `reject_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reject_orders`
--

INSERT INTO `reject_orders` (`reject_id`, `service_id`, `customer_id`, `note`, `reject_date`) VALUES
(1, 'RP_00007', 16, 'test', '2025-04-18 11:27:32'),
(2, 'RP_00010', 16, 'test', '2025-05-01 11:10:09');

-- --------------------------------------------------------

--
-- Table structure for table `repairing`
--

CREATE TABLE `repairing` (
  `id` varchar(10) NOT NULL,
  `patchesApplied` varchar(255) NOT NULL,
  `punctureSize` varchar(255) NOT NULL,
  `insideDamagePhoto` varchar(255) DEFAULT NULL,
  `outsideDamagePhoto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `repairing`
--

INSERT INTO `repairing` (`id`, `patchesApplied`, `punctureSize`, `insideDamagePhoto`, `outsideDamagePhoto`) VALUES
('RP_00001', '21', '1', NULL, NULL),
('RP_00002', '55', '55', '/uploads/1743848574550-IMG-20240901-WA0047.jpg', '/uploads/1743848574561-IMG-20240901-WA0048.jpg'),
('RP_00003', '1', '12', '/uploads/1744026725474-IMG-20240901-WA0059.jpg', '/uploads/1744026725481-IMG-20240901-WA0061.jpg'),
('RP_00004', '1', '12', '/uploads/1744043900339-IMG-20240901-WA0055.jpg', '/uploads/1744043900348-IMG-20240901-WA0056.jpg'),
('RP_00005', '7', '8', '/uploads/1744868736434-mainImage.jpg', '/uploads/1744868736444-IMG-20240901-WA0050.jpg'),
('RP_00006', '1', '21', '/uploads/1744877300048-IMG-20240901-WA0052.jpg', '/uploads/1744877300053-IMG-20240901-WA0051.jpg'),
('RP_00007', '1', '21', '/uploads/1744901241574-IMG-20240901-WA0050.jpg', '/uploads/1744901241584-IMG-20240901-WA0049.jpg'),
('RP_00008', '88', '88', '/uploads/1744902667115-images (1).jpg', '/uploads/1744902667116-images (2).jpg'),
('RP_00009', '1', '55', '/uploads/1745918205141-processImg2.jpg', '/uploads/1745918205141-processImg2.jpg'),
('RP_00010', '1', '55', '/uploads/1745918451149-processImg2.jpg', '/uploads/1745918451149-processImg1.jpg'),
('RP_00011', '1', '12', '/uploads/1746542980895-images (5).jpg', '/uploads/1746542980895-download (5).jpg'),
('RP_00012', '1', '15', '/uploads/1746543162016-images (9).jpg', '/uploads/1746543162016-images (11).jpg'),
('RP_00013', '1', '21', '/uploads/1746789939410-images (8).jpg', '/uploads/1746789939411-IMAG0285.jpg'),
('RP_00014', '1', '21', '/uploads/1746900752537-images.jpg', '/uploads/1746900752538-images (13).jpg');

-- --------------------------------------------------------

--
-- Table structure for table `retreading`
--

CREATE TABLE `retreading` (
  `id` varchar(10) NOT NULL,
  `sizeCode` varchar(25) NOT NULL,
  `wheelDiameter` varchar(25) NOT NULL,
  `tireWidth` varchar(25) NOT NULL,
  `tirePattern` varchar(25) NOT NULL,
  `insidePhoto` varchar(255) DEFAULT NULL,
  `outsidePhoto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `retreading`
--

INSERT INTO `retreading` (`id`, `sizeCode`, `wheelDiameter`, `tireWidth`, `tirePattern`, `insidePhoto`, `outsidePhoto`) VALUES
('RD_00004', '2345', '55', '55', '1', '/uploads/1743850520981-images (2).jpg', '/uploads/1743850520982-images (1).jpg'),
('RD_00005', '123456', '55', '55', '3', '/uploads/1744043872361-mainImage.jpg', '/uploads/1744043872496-IMG-20240901-WA0059.jpg'),
('RD_00006', '12345', '55', '53', '3', '/uploads/1744263355580-IMG-20240901-WA0051.jpg', '/uploads/1744263355594-IMG-20240901-WA0050.jpg'),
('RD_00007', '123456', '55', '55', '4', '/uploads/1744379154089-IMG-20240901-WA0065.jpg', '/uploads/1744379154099-IMG-20240901-WA0067.jpg'),
('RD_00008', '4', '4', '4', '3', '/uploads/1744868221839-IMG-20240901-WA0047.jpg', '/uploads/1744868221849-IMG-20240901-WA0048.jpg'),
('RD_00009', '4', '4', '4', '5', '/uploads/1744882860076-IMG-20240901-WA0047.jpg', '/uploads/1744882860120-IMG-20240901-WA0048.jpg'),
('RD_00010', '44', '44', '44', '2', '/uploads/1744897505129-IMG-20240901-WA0047.jpg', '/uploads/1744897505146-IMG-20240901-WA0048.jpg'),
('RD_00011', '99', '99', '99', '2', '/uploads/1744905287389-IMG-20240901-WA0049.jpg', '/uploads/1744905287406-IMG-20240901-WA0050.jpg'),
('RD_00012', '444', '23456', '44', '1', '/uploads/1745473304912-IMG-20240901-WA0051.jpg', '/uploads/1745473304926-IMG-20240901-WA0052.jpg'),
('RD_00013', '2345', '44', '44', '3', '/uploads/1745475080974-IMG-20240901-WA0053.jpg', '/uploads/1745475080992-IMG-20240901-WA0054.jpg'),
('RD_00014', '2345', '85288', '25', '2', '/uploads/1745917532413-processImg2.jpg', '/uploads/1745917532414-processImg1.jpg'),
('RD_00015', '78', '14', '185', '2', '/uploads/1746539732640-images (9).jpeg', '/uploads/1746539732641-download (11).jpeg'),
('RD_00016', '75', '14', '180', '1', '/uploads/1746541521654-download (3).jpeg', '/uploads/1746541521654-download (12).jpeg'),
('RD_00017', '69', '14', '155', '3', '/uploads/1746789603177-11.Signs-it_s-time-to-replace-your-used-tires.webp', '/uploads/1746789603180-download (7).jpeg'),
('RD_00018', '69', '14', '155', '2', '/uploads/1746864358001-download (4).jpeg', '/uploads/1746864358002-download (11).jpeg'),
('RD_00019', '2345', '14', '155', '4', '/uploads/1746864445261-images (2).jpeg', '/uploads/1746864445263-images (12).jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` varchar(10) NOT NULL,
  `tireBrand` varchar(255) NOT NULL,
  `internalStructure` varchar(255) NOT NULL,
  `receiveDate` date NOT NULL,
  `notes` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `needDeliveryService` varchar(10) NOT NULL,
  `total_amount` int(20) NOT NULL,
  `customer_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `tireBrand`, `internalStructure`, `receiveDate`, `notes`, `status`, `needDeliveryService`, `total_amount`, `customer_ID`) VALUES
('RD_00004', '55', 'Nylon', '2025-04-05', 'zxcfvgbhnm', 'Approved', 'Yes', 5000, 16),
('RD_00005', 'react', 'Nylon', '2025-04-07', 'hi check 2', 'Approved', '', 0, 16),
('RD_00006', 'react', 'IronWire', '2025-04-10', 'test', 'Approved', '', 0, 16),
('RD_00007', 'react', 'IronWire', '2025-04-11', 'test', 'Approved', '', 0, 16),
('RD_00008', 'tokiyo', 'IronWire', '2025-04-17', 'test', 'Approved', '', 0, 16),
('RD_00009', 'tokiyo', 'IronWire', '2025-04-17', 'test', 'Approved', '', 0, 16),
('RD_00010', '44', 'Nylon', '2025-04-17', 'test', 'Approved', '', 0, 16),
('RD_00011', '99', 'IronWire', '2025-04-17', 'testt', 'Approved', '', 0, 16),
('RD_00012', 'oji', 'IronWire', '2025-04-24', 'test', 'Approved', 'Yes', 0, 16),
('RD_00013', '44', 'IronWire', '2025-04-24', 'test3', 'Approved', 'Yes', 0, 16),
('RD_00014', '555', 'Nylon', '2025-04-29', 'test', 'Approved', 'Yes', 0, 16),
('RD_00015', 'CEAT', 'Nylon', '2025-05-06', 'give me a quality service', 'Approved', 'Yes', 0, 43),
('RD_00016', 'DSI', 'IronWire', '2025-05-06', 'i have best product', 'Approved', 'Yes', 0, 43),
('RD_00017', 'CEAT', 'Nylon', '2025-05-09', 'test', 'Approved', 'Yes', 0, 16),
('RD_00018', 'CEAT', 'IronWire', '2025-05-10', 'test', 'Pending', 'Yes', 0, 16),
('RD_00019', 'CEAT', 'Nylon', '2025-05-10', 'test', 'Pending', 'Yes', 0, 16),
('RP_00001', 'xcfvb', 'Iron Wire', '2025-04-14', 'zsxdfgh', 'Approved', '', 0, 16),
('RP_00002', '55', 'Not Sure', '2025-04-21', 'Zxcvbgnm', 'Approved', '', 0, 16),
('RP_00003', 'dsi', 'Iron Wire', '2025-04-14', 'hi hii', 'Approved', '', 0, 16),
('RP_00004', 'dsi', 'Iron Wire', '2025-04-14', 'hi check 3', 'Approved', '', 0, 16),
('RP_00005', '9', 'Nylon', '2025-04-23', '777', 'Approved', '', 0, 16),
('RP_00006', 'DSI', 'Iron Wire', '2025-04-17', 'testtttttttttt', 'Approved', '', 0, 16),
('RP_00007', 'DSI', 'Iron Wire', '2025-04-17', 'test', 'Rejected', '', 0, 16),
('RP_00008', '88', 'Iron Wire', '2025-04-17', 'test', 'Approved', 'Yes', 0, 16),
('RP_00009', '55', 'Iron Wire', '2025-04-29', 'testt', 'Approved', 'Yes', 0, 16),
('RP_00010', '55', 'Iron Wire', '2025-04-29', 'testt', 'Rejected', 'Yes', 0, 16),
('RP_00011', 'CEAT', 'Nylon', '2025-05-14', 'best product', 'Checking', 'Yes', 0, 43),
('RP_00012', 'DSI', 'Iron Wire', '2025-05-15', 'repair the patch', 'Approved', 'Yes', 0, 43),
('RP_00013', 'DSI', 'Not Sure', '2025-05-21', 'test', 'Checking', 'Yes', 0, 16),
('RP_00014', 'Toyo', 'Iron Wire', '2025-05-13', 'test', 'Pending', 'Yes', 0, 16);

-- --------------------------------------------------------

--
-- Table structure for table `supplies`
--

CREATE TABLE `supplies` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `phone_number` int(10) NOT NULL,
  `date_added` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplies`
--

INSERT INTO `supplies` (`id`, `name`, `address`, `company_name`, `phone_number`, `date_added`) VALUES
(16, 'Enura Kashmira', 'Yatadola, St. George Estate', 'Dulanka International (Pvt) Ltd', 718523698, '2025-05-07 13:24:15'),
(18, 'Dulmi Hettiarachchi', 'Lot 2F, Panaluwa Industrial Estate, Watareka, Padu', 'Unicorn Tyre Retreads Pvt Ltd', 716598123, '2025-05-08 13:50:16'),
(20, 'kavishi frenando', '50 Panwila Road, Wattegama, Rasela, Kandy, Sri Lan', 'KTT Tyre Retreading', 712365987, '2025-05-08 13:57:38'),
(21, 'Sagarika Liyanapathirana', 'No. 1, Dankotuwa Industrial Estate, Dankotuwa, Sri', 'MRF Lanka Pvt Ltd', 714679852, '2025-05-08 14:02:10'),
(22, 'Thilak perera', 'Negombo Road, Peliyagoda, Sri Lanka', 'Lanka Rubber Merchants', 711895632, '2025-05-08 14:06:33');

-- --------------------------------------------------------

--
-- Table structure for table `tire_patterns`
--

CREATE TABLE `tire_patterns` (
  `pattern_num` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tire_patterns`
--

INSERT INTO `tire_patterns` (`pattern_num`, `image_path`) VALUES
(1, '/assets/pattern/pattern1.jpg'),
(2, '/assets/pattern/pattern2.jpg'),
(3, '/assets/pattern/pattern3.jpg'),
(4, '/assets/pattern/pattern4.jpg'),
(5, '/assets/pattern/pattern5.jpg'),
(6, '/assets/pattern/pattern6.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `worker_attendance`
--

CREATE TABLE `worker_attendance` (
  `worker_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `worker_attendance`
--

INSERT INTO `worker_attendance` (`worker_id`, `date`) VALUES
(20, '2025-04-01'),
(20, '2025-04-04'),
(20, '2025-04-12'),
(20, '2025-04-24'),
(20, '2025-04-25'),
(20, '2025-04-30'),
(20, '2025-05-02'),
(20, '2025-05-04'),
(20, '2025-05-07'),
(20, '2025-05-08'),
(20, '2025-05-09'),
(20, '2025-05-12'),
(21, '2025-03-27'),
(21, '2025-04-01'),
(21, '2025-04-04'),
(21, '2025-04-12'),
(21, '2025-04-24'),
(21, '2025-04-25'),
(21, '2025-04-30'),
(21, '2025-05-02'),
(21, '2025-05-04'),
(21, '2025-05-07'),
(21, '2025-05-08'),
(21, '2025-05-09'),
(21, '2025-05-12'),
(22, '2025-04-04'),
(22, '2025-04-12'),
(22, '2025-04-25'),
(22, '2025-04-30'),
(22, '2025-05-02'),
(22, '2025-05-04'),
(22, '2025-05-07'),
(22, '2025-05-08'),
(22, '2025-05-09'),
(22, '2025-05-12'),
(27, '2025-05-09'),
(27, '2025-05-12'),
(28, '2025-05-09'),
(28, '2025-05-12'),
(29, '2025-05-09'),
(29, '2025-05-12'),
(31, '2025-05-12');

-- --------------------------------------------------------

--
-- Table structure for table `worker_messages`
--

CREATE TABLE `worker_messages` (
  `id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `worker_messages`
--

INSERT INTO `worker_messages` (`id`, `worker_id`, `message`, `created_at`, `is_read`) VALUES
(14, 21, 'fhshsjs', '2025-04-17 15:40:09', 0),
(18, 21, 'hyyooooooooooooooo', '2025-05-02 06:04:44', 0),
(19, 21, 'xcghjkl;kjhgfghjkl.lkjhgfvbnm,.', '2025-05-02 06:12:41', 1),
(20, 21, 'sdxfghkjjkh', '2025-05-02 06:13:44', 1),
(21, 21, 'hiiiiiiii', '2025-05-09 08:03:57', 0);

-- --------------------------------------------------------

--
-- Table structure for table `worker_payments`
--

CREATE TABLE `worker_payments` (
  `id` int(11) NOT NULL,
  `assignedWorker` int(11) NOT NULL,
  `MonthAttendDates` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `bonus` decimal(10,2) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `worker_payments`
--

INSERT INTO `worker_payments` (`id`, `assignedWorker`, `MonthAttendDates`, `amount`, `bonus`, `note`, `date`, `status`) VALUES
(1, 20, 'April 2025 (3 Days)', 7500.00, 500.00, 'check', '2025-04-10', 'Pending'),
(2, 21, 'April 2025 (2 Days)', 3000.00, 100.00, 'test 2', '2025-04-11', 'Paid'),
(3, 21, 'April 2025 (3 Days)', 4500.00, 22.00, 'hjhgg', '2025-04-24', 'Paid'),
(4, 27, 'May 2025 (0 Days)', 1200.00, 45000.00, 'test', '2025-05-09', 'Paid'),
(5, 21, 'May 2025 (5 Days)', 7500.00, 5000.00, 'test', '2025-05-12', 'Paid');

-- --------------------------------------------------------

--
-- Table structure for table `worker_register`
--

CREATE TABLE `worker_register` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `phone1` varchar(20) NOT NULL,
  `phone2` varchar(20) DEFAULT NULL,
  `nic` varchar(20) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `worker_register`
--

INSERT INTO `worker_register` (`id`, `firstName`, `lastName`, `email`, `title`, `phone1`, `phone2`, `nic`, `address1`, `address2`, `password`, `profilePicture`, `status`) VALUES
(20, 'nadee', 'kaa', 'ff@gmail.com', 'mr', '123456', '234567', '23456', 'sathuta', 'horonduwa', '$2a$10$EJxWN3q9S0VIOX2Uv6nquuWY47Ie9k2nNtybdE.DMQIPDg4c3DCsO', '/uploads/1741107476179.jpg', 'Removed'),
(21, 'qwert', 'asd', 'ddddd@gmail.com', 'mr', '123456', 'sdfgh', '23456', 'sathuta', 'horonduwa', '$2a$10$IuOsUykSROf5u0pXhCz8WurzvNVcMkm7vk1/jLyk3HBaW7Q4M/zOm', '/uploads/1741110604472.jpeg', 'Approved'),
(22, 'enura', 'kashmira', 'enura@gmail.com', 'qwertyu', '123456', 'q23456', '123456', 'dfg', 'asdfgh', '$2a$10$D98421632Qe4Gz6y5KFCuuiS3aFSxXgdmSmuFIBRRRQ0TqiNg8AlO', '/uploads/1741189227368.jpg', 'Approved'),
(27, 'Charith', 'Malaka', 'charith@gmail.com', 'mr', '0718523698', '0714596852', '200136985214', 'No. 1, Dankotuwa Industrial Estate', ' Dankotuwa, Sri Lanka', '$2a$10$zTduMXAtGZ78ll9PjpL5Z.dTi/ESfELRHAM2XBHcX02rPRX2ugom.', '/uploads/1746771666735.jpg', 'Approved'),
(28, 'Sugath', 'Siriwardana', 'sugith@gmail.com', 'mr', '0715286542', '0717517940', '123456789123', 'SATHUTA', 'Horonduwa', '$2a$10$IesAGP36k3qxSZlmT2DTMujS0ZNsV6uU88pZ9RFMDncwi/Q2qPU6.', '/uploads/1746772648265.jpg', 'Pending'),
(29, 'Hasindu', 'Thirasara', 'hasinduthirasaramg@gmail.com', 'Mr', '0717517940', '0715599046', '200235703151', 'SATHUTA', 'Horonduwa', '$2a$10$nG0jjVnMWBknv9n8iJMvmeXe3bvupSVt.e0pd/rd33FdVH29fZGeO', '/uploads/1746779387269.jpg', 'Approved'),
(31, 'Hasindu', 'Thirasara', 'hasinduthirasara@gmail.com', 'Mr', '0717517940', '0715599044', '200235703151', 'SATHUTA', 'Horonduwa', '$2a$10$xBl733uC4zhPkLf8y7GVBu21VFL2Vkuq73u4zF1NrYZO90iJ7LfQu', '/uploads/1746942993179.png', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `worker_stock_decreases`
--

CREATE TABLE `worker_stock_decreases` (
  `id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `decrease_amount` int(11) NOT NULL,
  `decrease_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `worker_stock_decreases`
--

INSERT INTO `worker_stock_decreases` (`id`, `worker_id`, `product_id`, `decrease_amount`, `decrease_date`) VALUES
(2, 21, 6, 7, '2025-05-08 17:54:19'),
(3, 21, 6, 7, '2025-05-08 17:54:22'),
(4, 21, 6, 7, '2025-05-08 17:54:29'),
(5, 21, 8, 5, '2025-05-08 17:55:12'),
(6, 21, 8, 3, '2025-05-09 04:08:51'),
(7, 21, 9, 10, '2025-05-09 04:09:24'),
(8, 21, 6, 7, '2025-05-09 06:07:46'),
(9, 21, 6, 7, '2025-05-09 06:08:03'),
(10, 21, 6, 7, '2025-05-09 06:08:13'),
(11, 21, 6, 8, '2025-05-09 06:10:01'),
(12, 21, 6, 7, '2025-05-09 18:21:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_payments`
--
ALTER TABLE `customer_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `customer_ID` (`customer_ID`);

--
-- Indexes for table `customer_register`
--
ALTER TABLE `customer_register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `nic_2` (`nic`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `service_id` (`service_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `own_ID` (`own_ID`);

--
-- Indexes for table `our_products`
--
ALTER TABLE `our_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `owner_register`
--
ALTER TABLE `owner_register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reject_orders`
--
ALTER TABLE `reject_orders`
  ADD PRIMARY KEY (`reject_id`),
  ADD KEY `fk_service` (`service_id`),
  ADD KEY `fk_customer` (`customer_id`);

--
-- Indexes for table `repairing`
--
ALTER TABLE `repairing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `retreading`
--
ALTER TABLE `retreading`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `customer_ID` (`customer_ID`);

--
-- Indexes for table `supplies`
--
ALTER TABLE `supplies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tire_patterns`
--
ALTER TABLE `tire_patterns`
  ADD PRIMARY KEY (`pattern_num`);

--
-- Indexes for table `worker_attendance`
--
ALTER TABLE `worker_attendance`
  ADD PRIMARY KEY (`worker_id`,`date`);

--
-- Indexes for table `worker_messages`
--
ALTER TABLE `worker_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_worker` (`worker_id`);

--
-- Indexes for table `worker_payments`
--
ALTER TABLE `worker_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignedWorker` (`assignedWorker`);

--
-- Indexes for table `worker_register`
--
ALTER TABLE `worker_register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `worker_stock_decreases`
--
ALTER TABLE `worker_stock_decreases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `worker_id` (`worker_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer_payments`
--
ALTER TABLE `customer_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customer_register`
--
ALTER TABLE `customer_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `our_products`
--
ALTER TABLE `our_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `owner_register`
--
ALTER TABLE `owner_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `reject_orders`
--
ALTER TABLE `reject_orders`
  MODIFY `reject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `supplies`
--
ALTER TABLE `supplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `worker_messages`
--
ALTER TABLE `worker_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `worker_payments`
--
ALTER TABLE `worker_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `worker_register`
--
ALTER TABLE `worker_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `worker_stock_decreases`
--
ALTER TABLE `worker_stock_decreases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_payments`
--
ALTER TABLE `customer_payments`
  ADD CONSTRAINT `customer_payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `customer_payments_ibfk_2` FOREIGN KEY (`customer_ID`) REFERENCES `customer_register` (`id`);

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplies` (`id`),
  ADD CONSTRAINT `inventory_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `worker_register` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`own_ID`) REFERENCES `owner_register` (`id`);

--
-- Constraints for table `our_products`
--
ALTER TABLE `our_products`
  ADD CONSTRAINT `our_products_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `owner_register` (`id`);

--
-- Constraints for table `reject_orders`
--
ALTER TABLE `reject_orders`
  ADD CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE;

--
-- Constraints for table `repairing`
--
ALTER TABLE `repairing`
  ADD CONSTRAINT `repairing_ibfk_1` FOREIGN KEY (`id`) REFERENCES `services` (`service_id`);

--
-- Constraints for table `retreading`
--
ALTER TABLE `retreading`
  ADD CONSTRAINT `retreading_ibfk_1` FOREIGN KEY (`id`) REFERENCES `services` (`service_id`);

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_2` FOREIGN KEY (`customer_ID`) REFERENCES `customer_register` (`id`);

--
-- Constraints for table `worker_messages`
--
ALTER TABLE `worker_messages`
  ADD CONSTRAINT `fk_worker` FOREIGN KEY (`worker_id`) REFERENCES `worker_register` (`id`);

--
-- Constraints for table `worker_payments`
--
ALTER TABLE `worker_payments`
  ADD CONSTRAINT `worker_payments_ibfk_1` FOREIGN KEY (`assignedWorker`) REFERENCES `worker_register` (`id`);

--
-- Constraints for table `worker_stock_decreases`
--
ALTER TABLE `worker_stock_decreases`
  ADD CONSTRAINT `worker_stock_decreases_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `worker_register` (`id`),
  ADD CONSTRAINT `worker_stock_decreases_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
