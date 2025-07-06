export const tracks = [
    { key: "Operating System L1", value: "operatingSystemLevel1" },
    { key: "Operating System L2", value: "operatingSystemLevel2" },
    { key: "Operating System L3", value: "operatingSystemLevel3" },
    { key: "DBMS L1", value: "dbmsLevel1" },
    { key: "DBMS L2", value: "dbmsLevel2" },
    { key: "DBMS L3", value: "dbmsLevel3" },
    { key: "Computer Networks L1", value: "computerNetworksLevel1" },
    { key: "Computer Networks L2", value: "computerNetworksLevel2" },
    { key: "Computer Networks L3", value: "computerNetworksLevel3" },
    { key: "Object Oriented Programming", value: "oop" },
    { key: "Mock Interview", value: "mockInterview" },
];

const operatingSystemLevel1: string[] = [
    "What is an operating system?",
    "Name two popular operating systems.",
    "What is the main function of an operating system?",
    "What is a process?",
    "What is the difference between process and program?",
    "What is multitasking?",
    "What is a file system?",
    "What is the purpose of RAM in a computer?",
    "What is virtual memory?",
    "What is a kernel?",
    "What is a device driver?",
    "What is the difference between primary and secondary memory?",
    "What is a deadlock?",
    "What is a system call?",
    "What is the difference between user mode and kernel mode?"
]
const operatingSystemLevel2: string[] = [
    "Explain the concept of process synchronization.",
    "What are semaphores and how are they used?",
    "Describe the differences between threads and processes.",
    "What is paging and how does it work?",
    "Explain the concept of segmentation in memory management.",
    "What is a context switch?",
    "Describe different types of scheduling algorithms.",
    "What is a race condition? How can it be prevented?",
    "Explain the difference between preemptive and non-preemptive scheduling.",
    "What is demand paging?",
    "How does a page replacement algorithm work? Name a few.",
    "What is thrashing in operating systems?",
    "Explain the concept of critical section.",
    "What is the difference between logical and physical address space?",
    "Describe the producer-consumer problem."
]
const operatingSystemLevel3: string[] = [
    "Explain the differences between monolithic and microkernel architectures.",
    "Describe how virtual memory is implemented in modern operating systems.",
    "What are the various states of a process? Explain each.",
    "How does the operating system handle interrupts?",
    "Explain the Banker's Algorithm for deadlock avoidance.",
    "Describe the steps involved in context switching.",
    "What is demand paging and how does it differ from pure paging?",
    "Explain the concept of memory fragmentation and how it can be minimized.",
    "How do operating systems implement security and protection mechanisms?",
    "Describe the differences between cooperative and preemptive multitasking.",
    "What is the role of the scheduler in an operating system?",
    "Explain the concept of I/O buffering and its advantages.",
    "How does the operating system manage device drivers?",
    "Describe the differences between hard and soft real-time operating systems.",
    "What are the challenges in designing a distributed operating system?"
]

const dbmsLevel1: string[] = [
    "What does DBMS stand for?",
    "Name two popular database management systems.",
    "What is a database?",
    "What is a primary key?",
    "What is a foreign key?",
    "What is SQL?",
    "What is a table in a database?",
    "What is normalization?",
    "What is a record in a database?",
    "What is a field in a database table?",
    "What is the purpose of a DBMS?",
    "What is a query?",
    "What is data redundancy?",
    "What is a relational database?",
    "What is a schema in DBMS?"
]
const dbmsLevel2: string[] = [
    "Explain the different types of database keys.",
    "What are the different normal forms?",
    "Explain the concept of ACID properties.",
    "What is indexing and why is it used?",
    "Describe the difference between DELETE and TRUNCATE commands.",
    "What is a transaction in DBMS?",
    "Explain the concept of joins. Name different types of joins.",
    "What is a view in SQL?",
    "Explain the difference between clustered and non-clustered indexes.",
    "What is denormalization?",
    "What is a stored procedure?",
    "Explain the concept of referential integrity.",
    "What is a trigger in a database?",
    "What is the difference between DBMS and RDBMS?",
    "What is a composite key?"
]
const dbmsLevel3: string[] = [
    "Explain the differences between 2NF, 3NF, and BCNF with examples.",
    "Describe the steps involved in query processing and optimization.",
    "What is concurrency control and why is it important?",
    "Explain the concept of deadlock in DBMS and how it can be prevented.",
    "Describe different types of database architectures (centralized, distributed, parallel).",
    "What are isolation levels? Explain with examples.",
    "How does indexing improve query performance?",
    "Explain the difference between serializable and non-serializable schedules.",
    "What is shadow paging?",
    "Describe the two-phase commit protocol.",
    "What are the challenges in distributed databases?",
    "Explain the CAP theorem.",
    "What is data replication and why is it used?",
    "Describe the difference between OLTP and OLAP systems.",
    "How does DBMS ensure data integrity and consistency?"
]

const computerNetworksLevel1: string[] = [
    "What is a computer network?",
    "Name two types of computer networks.",
    "What is the purpose of networking?",
    "What is an IP address?",
    "What is a MAC address?",
    "What is a router?",
    "What is a switch?",
    "What is the difference between LAN and WAN?",
    "What is the Internet?",
    "What is a protocol?",
    "What is HTTP?",
    "What is bandwidth?",
    "What is a firewall?",
    "What is DNS?",
    "What is a subnet mask?"
]
const computerNetworksLevel2: string[] = [
    "Explain the OSI model and its layers.",
    "What is TCP/IP?",
    "Describe the difference between TCP and UDP.",
    "What is ARP and how does it work?",
    "Explain the concept of subnetting.",
    "What is NAT and why is it used?",
    "What is DHCP?",
    "Explain the difference between unicast, multicast, and broadcast.",
    "What is a VPN?",
    "What is a socket?",
    "Explain the three-way handshake in TCP.",
    "What is packet switching?",
    "What is a gateway?",
    "What is the difference between static and dynamic routing?",
    "What is latency in networking?"
]
const computerNetworksLevel3: string[] = [
    "Explain how congestion control works in TCP.",
    "Describe the differences between IPv4 and IPv6.",
    "What is BGP and how does it work?",
    "Explain the Spanning Tree Protocol (STP).",
    "What are the security challenges in wireless networks?",
    "Describe the process of DNS resolution.",
    "What is Quality of Service (QoS) and how is it implemented?",
    "Explain the concept of network address translation (NAT) in detail.",
    "What is MPLS and where is it used?",
    "Describe the differences between circuit switching and packet switching.",
    "What is a man-in-the-middle attack and how can it be prevented?",
    "Explain the working of SSL/TLS in securing network communication.",
    "What is load balancing and how is it achieved in networks?",
    "Describe the process of routing table updates in dynamic routing protocols.",
    "What are the differences between symmetric and asymmetric encryption in network security?"
]

const oop: string[] = [
    "What is Object Oriented Programming (OOP)?",
    "Name the four main principles of OOP.",
    "What is a class in OOP?",
    "What is an object in OOP?",
    "What is encapsulation?",
    "What is inheritance?",
    "What is polymorphism?",
    "What is abstraction in OOP?",
    "Explain the difference between class and object.",
    "What is method overloading and method overriding?",
    "How does inheritance promote code reusability?",
    "What is the difference between composition and inheritance?",
    "Explain the concept of multiple inheritance and how it is handled in different languages.",
    "What are design patterns in OOP? Give examples.",
    "How does the SOLID principle relate to OOP design?"
]

const mockInterview: string[] = [
    "Tell me about yourself.",
    "Why did you choose computer science as your field of study?",
    "What programming languages are you most comfortable with?",
    "Explain the difference between an array and a linked list.",
    "What is a function and why do we use functions in programming?",
    "What is the difference between stack and queue?",
    "What is object-oriented programming?",
    "Can you explain what a database is?",
    "What is the purpose of an operating system?",
    "What is a loop? Name different types of loops.",
    "What is a variable?",
    "What is the difference between compilation and interpretation?",
    "What is a bug and how do you debug your code?",
    "What is version control? Have you used Git?",
    "What is an algorithm?",
    "What is the difference between HTTP and HTTPS?",
    "What is a class in programming?",
    "What is recursion?",
    "What is the difference between frontend and backend development?",
    "How do you stay updated with new technologies?",
    "Explain your project",
    "What tech stack did you used and why you chose it"
]

const questionsMap = new Map<string, string[]>();
questionsMap.set("operatingSystemLevel1", operatingSystemLevel1);
questionsMap.set("operatingSystemLevel2", operatingSystemLevel2);
questionsMap.set("operatingSystemLevel3", operatingSystemLevel3);
questionsMap.set("dbmsLevel1", dbmsLevel1);
questionsMap.set("dbmsLevel2", dbmsLevel2);
questionsMap.set("dbmsLevel3", dbmsLevel3);
questionsMap.set("computerNetworksLevel1", computerNetworksLevel1);
questionsMap.set("computerNetworksLevel2", computerNetworksLevel2);
questionsMap.set("computerNetworksLevel3", computerNetworksLevel3);
questionsMap.set("oop", oop);
questionsMap.set("mockInterview", mockInterview);

export default questionsMap;