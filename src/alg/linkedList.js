/**
 * 移除链表元素
 * https://leetcode.cn/problems/remove-linked-list-elements/description/
 * skill: dummy head
 */

function removeElements(head, val) {
    const dummy = new ListNode(0, head);
    let curr = dummy;
    while(curr && curr.next) {
        if(curr.next.val === val) {
            curr.next = curr.next.next;
        }else{
            curr = curr.next;
        }
    } 
    return dummy.next;   
}