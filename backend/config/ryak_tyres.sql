
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2025 at 10:25 AM
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
(6, 'Sarah Johnson', 'sarah.j@email.com', 'Excellent Service!', 'I just wanted to say how impressed I am with the customer service. Everything was smooth and professional. Keep up the great work!', 0, '2025-05-16 18:00:07'),
(7, 'Alex Fernandez', 'alexf@samplemail.com', 'Love the Website Design', 'The new website layout is clean, fast, and very user-friendly. I really enjoy browsing it now. Great job to the design team!', 0, '2025-05-16 18:00:38'),
(8, 'Emily Carter', 'emilyc@feedbackmail.com', 'Issue with Checkout', 'I faced an issue while trying to check out my order. The payment page kept reloading. Please look into it.', 0, '2025-05-16 18:01:17'),
(9, 'John Miller', 'jmiller@domain.com', ' Add More Product Info', 'It would be helpful to have more detailed specifications for the products, like dimensions and material. It makes decision-making easier.', 0, '2025-05-16 18:01:38'),
(10, 'Priya Rao', 'priya.r@inbox.com', 'Do You Offer Bulk Discounts?', 'I\'m interested in placing a large order for my business. Do you offer any discounts for bulk purchases?\n\n', 0, '2025-05-16 18:02:17'),
(11, 'David Kim', 'dkim@examplemail.com', 'Feature Suggestion', 'Would love to see a dark mode option on the site. It’s easier on the eyes, especially at night.', 0, '2025-05-16 18:02:47'),
(12, 'Rachel Adams', 'r.adams@mail.com', 'Quick Response Time', 'Thanks for getting back to me so quickly. I appreciate how responsive your support team is. It really makes a difference!', 0, '2025-05-16 18:03:21'),
(13, 'Marcus Lee', 'marcuslee@gmail.com', 'Very Satisfied', 'I ordered last week and everything arrived perfectly packaged and on time. Super satisfied with the entire experience.\n\n', 0, '2025-05-16 18:03:49'),
(14, 'Linda Chen', 'linda.chen@email.com', 'Good But Room to Improve', 'Overall the service was fine, but I think there\'s some room to improve in how order updates are communicated.', 0, '2025-05-16 18:04:24'),
(15, 'Daniel Smith', 'danielsmith@demo.com', 'Not Bad', 'The app is decent. It gets the job done, though some features feel a bit clunky on mobile. Looking forward to future updates.', 0, '2025-05-16 18:04:57'),
(16, 'Olivia Carter', 'oliviac@feedbackmail.com', 'Disappointed with the Delivery', 'My order arrived later than expected and one item was damaged. I hope you can resolve this quickly.', 0, '2025-05-16 18:05:24'),
(17, 'Benjamin Hall', 'ben.hall@mail.net', 'Poor Customer Support', 'I’ve tried contacting support three times and haven’t heard back. This is frustrating and unacceptable.\n\n', 0, '2025-05-16 18:06:22'),
(18, 'Noor Khan', 'noorkhan@email.com', ' Add Live Chat Support', 'It would be helpful to have a live chat option on the site for quicker assistance.', 0, '2025-05-16 18:11:40'),
(19, 'Tom Nguyen', 'tomnguyen@samplemail.com', 'Wishlist Feature', 'Could you add a wishlist or favorites section? It’d be easier to save items for later purchases.', 0, '2025-05-16 18:12:08'),
(20, 'Chloe Martinez', 'chloem@domain.com', 'More Payment Options', 'I’d love to see more payment methods like Apple Pay or PayPal available at checkout.\n\n', 0, '2025-05-16 18:12:33');

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
(11, '', 5000.00, 499.00, 10499.00, 'test', '2025-05-11', 'Credit Card', 40, 43),
(12, '', 4000.00, 200.00, 9200.00, 'test', '2025-05-15', 'Credit Card', 50, 43),
(13, '', 500.00, 500.00, 6000.00, 'test', '2025-05-16', 'Credit Card', 51, 16),
(14, '', 7500.00, 799.00, 8343.00, 'test', '2025-05-17', 'Credit Card', 33, 16),
(15, '', 7000.00, 520.00, 12520.00, 'test', '2025-05-17', 'Credit Card', 37, 16),
(16, '', 7000.00, 520.00, 12520.00, 'test', '2025-05-17', 'Credit Card', 37, 16),
(17, '', 7000.00, 520.00, 12520.00, 'test', '2025-05-17', 'Credit Card', 37, 16),
(18, '', 4500.00, 500.00, 10000.00, 'test', '2025-05-17', 'Credit Card', 41, 16);

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
(14, 7, 18, 50, 50, 4500.00, '2025-05-08 17:25:18');

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
(10, '🛞 Free Tire Check-Up – This Week Only!\nBring your vehicle in for a free tire inspection. Our team will assess wear, pressure, and alignment to ensure you\'re safe on the road.', '2025-05-17 07:18:27'),
(11, '🔥 Combo Deal – Retreading + Wheel Balancing at Just Rs 10000!\nBook your retreading with us and get wheel balancing at a discounted package rate. Offer ends soon!', '2025-05-17 07:19:00'),
(12, '🏅 Loyalty Rewards Program Launched!\nEarn points for every service you book. Redeem them for discounts, free services, or exclusive merchandise. Sign up today and get 100 bonus points!', '2025-05-17 07:19:23'),
(14, '🎁 Refer & Win Program\nRefer a friend and both of you get ₹200 off on your next service. Unlimited referrals = unlimited rewards!\n\n', '2025-05-17 07:21:00'),
(16, '🎉 Summer Special Offer – 20% Off Retreading Services!\nValid from June 1st – June 30th\nGet your old tires retreaded and road-ready at 20% off. Save money, drive safely, and extend tire life with our expert retreading service!', '2025-05-17 07:30:09');

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
(30, 100, '2025-06-15', 8000.00, 'Completed', 'Paid', 'RP_00008', 28, 10),
(31, 100, '2025-04-17', 855.00, 'Completed', 'Paid', 'RD_00011', 20, 10),
(32, 100, '2025-04-24', 500.00, 'Completed', 'Paid', 'RD_00012', 22, 10),
(33, 100, '2025-04-24', 44.00, 'Completed', 'Paid', 'RD_00013', 21, 10),
(37, 100, '2025-04-30', 5000.00, 'Completed', 'Paid', 'RP_00009', 21, 10),
(40, 100, '2025-04-04', 5000.00, 'Completed', 'Paid', 'RP_00012', 21, 10),
(41, 100, '2025-05-10', 5000.00, 'Completed', 'Paid', 'RD_00014', 29, 10),
(42, 100, '2025-05-10', 7000.00, 'Completed', 'not paid', 'RD_00015', 28, 10),
(43, 100, '2025-05-10', 8000.00, 'Completed', 'not paid', 'RD_00016', 28, 10),
(46, 100, '2025-05-12', 7500.00, 'Completed', 'not paid', 'RD_00017', 21, 10),
(50, 100, '2025-05-15', 5000.00, 'Completed', 'Paid', 'RD_00020', 27, 10),
(51, 100, '2025-05-16', 5000.00, 'Completed', 'Paid', 'RD_00018', 27, 10),
(52, 11, '2025-05-17', 7500.00, 'In Progres', 'not paid', 'RP_00011', 27, 10),
(53, 0, '2025-05-18', 5000.00, 'Pending', 'not paid', 'RP_00013', 32, 40),
(54, 100, '2025-05-18', 8000.00, 'Completed', 'not paid', 'RD_00019', 33, 40),
(55, 15, '2025-05-18', 5600.00, 'In Progres', 'not paid', 'RD_00022', 33, 40);

-- --------------------------------------------------------

--
-- Table structure for table `our_products`
--

CREATE TABLE `our_products` (
  `id` int(11) NOT NULL,
  `productName` varchar(130) NOT NULL,
  `description` varchar(250) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `owner_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `our_products`
--

INSERT INTO `our_products` (`id`, `productName`, `description`, `price`, `image`, `owner_id`) VALUES
(8, 'Truck Tyre – Lug Pattern (10.00-20)', 'The 10.00-20 lug tyre is designed for heavy-duty commercial trucks operating in rugged conditions. Its deep tread offers excellent traction and grip.\nTread Pattern: Lug (deep, block-style)\nBest For: Sand trucks, construction dumpers\nKey Benefit: Hand', 8500.00, '/uploads/1747415019952-81210483-truck-retread-tyre-1000x1000.jpeg', 10),
(9, 'Truck Tyre – Rib Pattern (295/80 R22.5)', 'Popular among highway trucks, the 295/80 R22.5 rib tyre is ideal for smooth long-distance driving with improved mileage and steering stability.\r\nTread Pattern: Rib (straight-line grooves)\r\nBest For: National permit trucks, trailers\r\nKey Benefit: Low ', 9796.00, '/uploads/1747415604855-680404303-OIP (8).jpg', 10),
(10, 'Bus Tyre (9.00-20)', 'The 9.00-20 tyre is used on both city and rural buses. It provides balanced performance, safety, and passenger comfort.\r\nTread Pattern: Mixed or lug\r\nBest For: Public transport buses\r\nKey Benefit: Reliable grip and durability', 10500.00, '/uploads/1747415729215-804739291-OIP (5).jpg', 10),
(11, 'Tractor Rear Tyre (16.9-28)', 'This large rear tyre is used in tractors for farming and field work. Its wide lugs give strong traction in all types of soil.\r\nTread Pattern: Bar/Lug (R-1)\r\nBest For: Agricultural tractors\r\nKey Benefit: Excellent grip and pulling power', 11500.00, '/uploads/1747415799758-729646427-OIP (2).jpg', 10),
(12, 'Light Commercial Vehicle (LCV) Tyre (7.50-16)', 'Common in vans and tempos, this tyre balances load-bearing and road comfort, ideal for short-haul goods carriers.\r\nTread Pattern: Mixed\r\nBest For: Tata 407, pickups, goods vans\r\nKey Benefit: Budget-friendly with decent mileage\r\n\r\n', 9500.00, '/uploads/1747415854865-42541563-OIP (7).jpg', 10),
(13, 'Earthmover / OTR Tyre (23.5-25)', 'Built for extreme duty, this off-the-road (OTR) tyre is used in mining, quarries, and construction. Retreading this saves major costs.\r\nTread Pattern: E3/L3/R4\r\nBest For: Bulldozers, loaders, graders\r\nKey Benefit: Heavy-duty toughness with cost savin', 15796.00, '/uploads/1747415933747-134104201-OIP (6).jpg', 10),
(14, 'Passenger Bus Tyre (195/65 R15)', 'A common size for many sedans and hatchbacks, this reconditioned tyre is a smart choice for city drivers on a budget.\r\nTread Pattern: Symmetrical/Asymmetrical\r\nBest For: Cars like Maruti Dzire, Hyundai i20\r\nKey Benefit: Affordable grip and performanc', 9500.00, '/uploads/1747417393855-358927065-OIP (3).jpg', 10),
(15, 'Tractor Front Tyre (Size: 6.00-16)', 'The 6.00-16 front tyre is typically used in two-wheel drive tractors. It provides easy steering and stable control during field operations.\r\nTread Pattern: Rib (straight grooves)\r\nBest For: Agricultural tractor front wheels\r\nKey Benefit: Smooth handl', 7800.00, '/uploads/1747417592233-803735459-OIP (9).jpg', 10),
(16, 'Trailer Tyre (Size: 11.00-20)', 'Used in heavy trailers for transporting goods, this tyre offers strong load-bearing capacity and smooth rolling on highways.\r\nTread Pattern: Rib/Lug\r\nBest For: Cargo trailers, container carriers\r\nKey Benefit: Durable and economical for heavy loads', 13500.00, '/uploads/1747417631743-382947916-OIP (10).jpg', 10),
(17, 'Bus Tyre (Size: 4.00-8)', 'This tyre is designed for auto-rickshaws and small Buses. It balances comfort and fuel efficiency for local transport.\r\nTread Pattern: Cross-ply or block\r\nBest For: Passenger and goods Bus\r\nKey Benefit: Affordable and reliable for city roads', 14800.00, '/uploads/1747417716695-908700499-2157016_21570r16_michelin_agil_1657004016_9d6fabab_progressive.jpg', 10);

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
(10, 'test', 'test', 'test@gmail.com', '$2a$10$umMl3cT0O.x9OQ2kh3pZt.MweMjiVY9Pi43Ugym.GbJxqp40StKaq'),
(40, 'Mohan', 'Liyanapathirana', 'mohan@gmail.com', '$2a$10$8m.d36NMwXO586qTNzZHAum/hLTR0efiSO2Inlx19s4bze36lpSqq');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `stock`) VALUES
(6, ' cushion gum', 'Uncured rubber layer that bonds tread rubber to th', 15),
(7, 'Pre-cured Tread Rubber', '	Vulcanized rubber strips molded with tread patter', 72),
(8, 'Uncured Tread Rubber', '	Soft, pliable rubber compound; shaped and cured d', 2),
(9, 'Bonding Cement', 'Chemical adhesive (solvent-based or rubber-based) ', 35),
(10, 'Envelope Rubber', '	Elastic rubber cover used to wrap around the tyre', 20),
(11, 'Liner Rubber Sheet', '	Thin uncured rubber sheet used to cover buffed ty', 8),
(12, 'Sidewall Veneer', 'Rubber used to restore or replace sidewall appeara', 5),
(13, 'Vulcanizing Solution', '	Adhesive that activates when heated, allowing rub', 15),
(14, 'Release Agents', 'Applied to prevent rubber from sticking to molds o', 20),
(15, 'Radial Repair Patches', '	Reinforced patches designed for radial tyre const', 25),
(16, 'Bias Repair Patches', 'Patches suitable for bias-ply tyres; offer flexibi', 16),
(17, 'Mushroom Plug / Plug Stem', 'Rubber stem with patch cap used for puncture repai', 27),
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
  `note` varchar(225) NOT NULL,
  `reject_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reject_orders`
--

INSERT INTO `reject_orders` (`reject_id`, `service_id`, `customer_id`, `note`, `reject_date`) VALUES
(1, 'RP_00007', 16, 'test', '2025-04-18 11:27:32'),
(2, 'RP_00010', 16, 'test', '2025-05-01 11:10:09'),
(3, 'RP_00015', 43, 'Buffing Issues\nExplanation: Buffing is the process of removing the old tread from the tyre. If done excessively or unevenly, it can damage the tyre casing,', '2025-05-15 20:06:11'),
(4, 'RP_00014', 16, 'test', '2025-05-16 10:57:46');

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
('RP_00002', '55', '55', '/uploads/1743848574550-IMG-20240901-WA0047.jpg', '/uploads/1743848574561-IMG-20240901-WA0048.jpg'),
('RP_00003', '1', '12', '/uploads/1744026725474-IMG-20240901-WA0059.jpg', '/uploads/1744026725481-IMG-20240901-WA0061.jpg'),
('RP_00004', '1', '12', '/uploads/1744043900339-IMG-20240901-WA0055.jpg', '/uploads/1744043900348-IMG-20240901-WA0056.jpg'),
('RP_00005', '7', '8', '/uploads/1744868736434-mainImage.jpg', '/uploads/1744868736444-IMG-20240901-WA0050.jpg'),
('RP_00006', '1', '21', '/uploads/1744877300048-IMG-20240901-WA0052.jpg', '/uploads/1744877300053-IMG-20240901-WA0051.jpg'),
('RP_00007', '1', '21', '/uploads/1744901241574-IMG-20240901-WA0050.jpg', '/uploads/1744901241584-IMG-20240901-WA0049.jpg'),
('RP_00009', '1', '55', '/uploads/1745918205141-processImg2.jpg', '/uploads/1745918205141-processImg2.jpg'),
('RP_00010', '1', '55', '/uploads/1745918451149-processImg2.jpg', '/uploads/1745918451149-processImg1.jpg'),
('RP_00011', '1', '12', '/uploads/1746542980895-images (5).jpg', '/uploads/1746542980895-download (5).jpg'),
('RP_00012', '1', '15', '/uploads/1746543162016-images (9).jpg', '/uploads/1746543162016-images (11).jpg'),
('RP_00013', '1', '21', '/uploads/1746789939410-images (8).jpg', '/uploads/1746789939411-IMAG0285.jpg'),
('RP_00014', '1', '21', '/uploads/1746900752537-images.jpg', '/uploads/1746900752538-images (13).jpg'),
('RP_00015', '1', '21', '/uploads/1747319714100-images (8).jpg', '/uploads/1747319714100-images (10).jpg'),
('RP_00016', '2', '20', '/uploads/1747421566385-images (1).jpg', '/uploads/1747421566385-images (13).jpg');

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
('RD_00019', '2345', '14', '155', '4', '/uploads/1746864445261-images (2).jpeg', '/uploads/1746864445263-images (12).jpeg'),
('RD_00020', '15', '75', '190', '3', '/uploads/1747316489866-images (9).jpeg', '/uploads/1747316489867-download (11).jpeg'),
('RD_00022', '55', '55', '55', '2', '/uploads/1747373225802-download (5).jpg', '/uploads/1747373225803-images (6).jpg');

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
('RD_00005', 'react', 'Nylon', '2025-04-07', 'hi check 2', 'Approved', '', 7000, 16),
('RD_00006', 'react', 'IronWire', '2025-04-10', 'test', 'Approved', '', 5000, 16),
('RD_00007', 'react', 'IronWire', '2025-04-11', 'test', 'Approved', '', 36000, 16),
('RD_00009', 'tokiyo', 'IronWire', '2025-04-17', 'test', 'Approved', '', 46000, 16),
('RD_00010', '44', 'Nylon', '2025-04-17', 'test', 'Approved', '', 22000, 16),
('RD_00011', '99', 'IronWire', '2025-04-17', 'testt', 'Approved', '', 19500, 16),
('RD_00012', 'oji', 'IronWire', '2025-04-24', 'test', 'Approved', 'Yes', 18000, 16),
('RD_00013', '44', 'IronWire', '2025-04-24', 'test3', 'Approved', 'Yes', 25000, 16),
('RD_00014', '555', 'Nylon', '2025-04-29', 'test', 'Approved', 'Yes', 10000, 16),
('RD_00015', 'CEAT', 'Nylon', '2025-05-06', 'give me a quality service', 'Approved', 'Yes', 0, 43),
('RD_00016', 'DSI', 'IronWire', '2025-05-06', 'i have best product', 'Approved', 'Yes', 0, 43),
('RD_00017', 'CEAT', 'Nylon', '2025-05-09', 'test', 'Approved', 'Yes', 0, 16),
('RD_00018', 'CEAT', 'IronWire', '2025-05-10', 'test', 'Approved', 'Yes', 4530, 16),
('RD_00019', 'CEAT', 'Nylon', '2025-05-10', 'test', 'Approved', 'Yes', 5420, 16),
('RD_00020', 'kumho', 'IronWire', '2025-05-15', 'test', 'Approved', 'Yes', 8400, 43),
('RD_00021', 'kumho', 'Nylon', '2025-05-15', 'test', 'Pending', 'Yes', 7600, 43),
('RD_00022', '55', 'IronWire', '2025-05-16', 'test', 'Approved', 'Yes', 3650, 43),
('RP_00001', 'xcfvb', 'Iron Wire', '2025-04-14', 'zsxdfgh', 'Approved', '', 68740, 16),
('RP_00002', '55', 'Not Sure', '2025-04-21', 'Zxcvbgnm', 'Approved', '', 8500, 16),
('RP_00003', 'dsi', 'Iron Wire', '2025-04-14', 'hi hii', 'Approved', '', 3500, 16),
('RP_00004', 'dsi', 'Iron Wire', '2025-04-14', 'hi check 3', 'Approved', '', 8400, 16),
('RP_00005', '9', 'Nylon', '2025-04-23', '777', 'Approved', '', 6500, 16),
('RP_00006', 'DSI', 'Iron Wire', '2025-04-17', 'testtttttttttt', 'Approved', '', 9000, 16),
('RP_00007', 'DSI', 'Iron Wire', '2025-04-17', 'test', 'Rejected', '', 0, 16),
('RP_00008', '88', 'Iron Wire', '2025-04-17', 'test', 'Approved', 'Yes', 8500, 16),
('RP_00009', '55', 'Iron Wire', '2025-04-29', 'testt', 'Approved', 'Yes', 7500, 16),
('RP_00010', '55', 'Iron Wire', '2025-04-29', 'testt', 'Rejected', 'Yes', 0, 16),
('RP_00011', 'CEAT', 'Nylon', '2025-05-14', 'best product', 'Approved', 'Yes', 0, 43),
('RP_00012', 'DSI', 'Iron Wire', '2025-05-15', 'repair the patch', 'Approved', 'Yes', 500, 43),
('RP_00013', 'DSI', 'Not Sure', '2025-05-21', 'test', 'Approved', 'Yes', 0, 16),
('RP_00014', 'Toyo', 'Iron Wire', '2025-05-13', 'test', 'Rejected', 'Yes', 0, 16),
('RP_00015', 'CEAT', 'Iron Wire', '2025-05-20', 'test', 'Rejected', 'Yes', 0, 43),
('RP_00016', 'Dunlop', 'Iron Wire', '2025-05-22', 'The tyre valve was found to be faulty and has been replaced with a new one. Please check pressure regularly and avoid over-tightening the valve cap', 'Pending', 'Yes', 0, 43);

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
(20, '2025-05-16'),
(20, '2025-05-18'),
(21, '2025-05-18'),
(22, '2025-05-18'),
(27, '2025-05-18'),
(28, '2025-05-18'),
(29, '2025-05-18'),
(31, '2025-05-18'),
(32, '2025-05-18'),
(33, '2025-05-18');

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
(23, 27, '✅ Request Approval to Send Offers Hello Sir, I have prepared a notice about this month’s 20% discount on retreading services. Would you like me to send it to all customers now, or would you like to review it first?', '2025-05-17 09:27:54', 0),
(24, 32, '🕒 Scheduling Request\nSir/Ma\'am,\nDo you want me to schedule the customer notice for tomorrow morning or send it out now?\nI’m ready to proceed once you approve.\n\n', '2025-05-17 10:23:51', 0),
(25, 33, '🔄 Update Request\nHello Sir,\nA few customers have asked for clarification regarding the current promotion.\nShould I send them an updated message, or would you prefer to handle it directly?', '2025-05-17 10:27:47', 0),
(26, 33, '📝 Customer List Request\nGood day Sir/Ma\'am,\nCould you please share the latest customer contact list? I want to make sure all notices reach the right people.\nThank you.', '2025-05-17 10:29:03', 0),
(27, 33, '💡 Promotion Idea Suggestion\nSir/Ma\'am,\nI had an idea – we could offer a “Buy 3 retreads, get 1 free” deal to increase visits this month.\nWould you like me to prepare a notice for that?\n', '2025-05-17 10:29:39', 0),
(28, 33, '🤝 Request to Add New Customer\nSir/Ma\'am,\nA new walk-in customer asked to receive updates and offers via WhatsApp.\nMay I add their number to our customer list for future notices?', '2025-05-17 10:30:01', 0);

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
(6, 27, 'May 2025 (0 Days)', 4500.00, 8000.00, 'test', '2025-05-18', 'Paid'),
(7, 33, 'May 2025 (1 Days)', 1500.00, 64000.00, 'test', '2025-05-18', 'Paid');

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
(31, 'Hasindu', 'Thirasara', 'hasinduthirasara@gmail.com', 'Mr', '0717517940', '0715599044', '200235703151', 'SATHUTA', 'Horonduwa', '$2a$10$xBl733uC4zhPkLf8y7GVBu21VFL2Vkuq73u4zF1NrYZO90iJ7LfQu', '/uploads/1746942993179.png', 'Rejected'),
(32, 'Navindu', 'Akalpa', 'navindu@gmail.com', 'mr', '0711798456', '0717532654', '200032569878', 'Sathuta', 'Horonduwa, Yatiyana', '$2a$10$rxbqp87HL2Fg52SXAcqASOJUrxgsuLZJUMTsyUxkaD6yvBxfzZSaq', '/uploads/1747474869130.jpeg', 'Approved'),
(33, 'Nuwan', 'Lakshan', 'nuwan@gmail.com', 'Mr', '0717598123', '0718956123', '199978451236', 'udaha para', 'yakkala', '$2a$10$AghF2Kes/SGvfX1uVJLHP.VzeXakWbZcAVZKGsnxCp6aflZQyZBx2', '/uploads/1747477606947.jpg', 'Approved');

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
(14, 33, 6, 3, '2025-05-18 11:41:42'),
(15, 33, 6, 3, '2025-05-18 11:41:48'),
(16, 33, 6, 4, '2025-05-18 11:44:50'),
(17, 33, 9, 5, '2025-05-18 11:45:08');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `customer_payments`
--
ALTER TABLE `customer_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `our_products`
--
ALTER TABLE `our_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `owner_register`
--
ALTER TABLE `owner_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `reject_orders`
--
ALTER TABLE `reject_orders`
  MODIFY `reject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `supplies`
--
ALTER TABLE `supplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `worker_messages`
--
ALTER TABLE `worker_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `worker_payments`
--
ALTER TABLE `worker_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `worker_register`
--
ALTER TABLE `worker_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `worker_stock_decreases`
--
ALTER TABLE `worker_stock_decreases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `worker_register` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`own_ID`) REFERENCES `owner_register` (`id`);

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
