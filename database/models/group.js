class Group {
  constructor(
    name,
    description,
    account,
    contributionDay,
    contributionAmount,
    avatar,
    fine
  ) {
    // Validate required fields
    if (!name || !account || !contributionDay || !contributionAmount || !fine) {
      throw new Error("Missing required fields");
    }

    this.name = name;
    this.description = description;
    this.timestamps = {
      createdAt: new Date(),
      updatedAt: null,
    };
    this.avatar = avatar, 
    this.account = account;
    this.contributionDay = contributionDay;
    this.contributionAmount = contributionAmount;
    this.fine = fine;
    this.members = [];
  }

 // Method to add a member to the group
  addMember(user) {
    // Initialize member fields
    this.members[user.id] = {
      totalAmountContributed: 0,
      deposit: 0,
      balance: 0,
      expectedPayment: 0,
      fine: 0
    };
  }

  // Method to update member's balance and expected payment
  updateMemberBalanceAndExpectedPayment(userId, amountToContribute, contributionDay) {

    this.members[userId].totalAmountContributed += amountToContribute;
    
    // Calculate expected payment and update balance
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    
    // Calculate the balance since start (totalAmountContributed - deposit)
    this.members[userId].balance = this.members[userId].totalAmountContributed - this.members[userId].deposit;

    // Update expected payment if it's contribution day
    if (contributionDay.includes(dayOfWeek)) {
      // Calculate the amount the member is expected to pay every week
      this.members[userId].expectedPayment = this.contributionAmount;
      
      // Apply fine if the member has not paid the expected amount
      if (this.members[userId].balance < this.members[userId].expectedPayment) {
        this.members[userId].fine = this.fine;
      }
    } else {
      // Reset expected payment and fine if it's not contribution day
      this.members[userId].expectedPayment = 0;
      this.members[userId].fine = 0;
    }
  }
}
