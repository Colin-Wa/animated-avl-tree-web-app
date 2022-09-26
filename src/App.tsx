import React, { useState } from 'react';
import './App.css';

class coordinate_pair
{
    x: number;
    y: number;
    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    public set_x(item: number)
    {
        this.x = item;
    }

    public set_y(item: number)
    {
        this.y = item;
    }

    public get_x(): number
    {
        return this.x;
    }

    public get_y(): number
    {
        return this.y;
    }
}

class AVLNode
{
    left: AVLNode | null;
    right: AVLNode | null;
    value: number;
    node_coords: coordinate_pair;
    destination_coords: coordinate_pair;
    orgin_coords: coordinate_pair;
    animation_step: number
    top_center_coords: coordinate_pair;
    bottom_left_coords: coordinate_pair;
    bottom_right_coords: coordinate_pair;
    border_color: String;
    base_border_color: String;
    radius: number;
    displayed: Boolean;
    parent: AVLNode|null;
    constructor(item: number, x: number, y: number, r: number, c: String, d: Boolean, p: AVLNode|null)
    {
        this.left = null;
        this.right = null;
        this.value = item;
        this.node_coords = new coordinate_pair(x,y);
        this.destination_coords = new coordinate_pair(x,y);
        this.orgin_coords = new coordinate_pair(x,y);
        this.animation_step = -1;
        this.radius = r;
        this.border_color = c;
        this.base_border_color = c;
        this.top_center_coords = new coordinate_pair(x, y - this.radius);
        this.bottom_left_coords = new coordinate_pair(x - (this.radius * 2 / 3), y + (this.radius * 2 / 3));
        this.bottom_right_coords = new coordinate_pair(x + (this.radius * 2 / 3), y + (this.radius * 2 / 3));
        this.displayed = d;
        this.parent = p;
    }

    public set_parent(p: AVLNode|null)
    {
      this.parent = p;
    }

    public get_parent(): AVLNode|null
    {
      return this.parent;
    }

    public set_left(item: AVLNode | null)
    {
        this.left = item;
    }

    public set_right(item: AVLNode | null)
    {
        this.right = item;
    }

    public get_left(): AVLNode | null
    {
        return this.left;
    }

    public get_right(): AVLNode | null
    {
        return this.right;
    }

    public get_value(): number
    {
        return this.value;
    }

    public get_top_center_coords(): coordinate_pair
    {
        return this.top_center_coords;
    }

    public get_bottom_left_coords(): coordinate_pair
    {
        return this.bottom_left_coords;
    }

    public get_bottom_right_coords(): coordinate_pair
    {
        return this.bottom_right_coords;
    }

    public set_top_center_coords(item: coordinate_pair)
    {
        this.top_center_coords = item;
    }

    public set_bottom_left_coords(item: coordinate_pair)
    {
        this.bottom_left_coords = item;
    }

    public set_bottom_right_coords(item: coordinate_pair)
    {
        this.bottom_right_coords = item;
    }

    public set_border_color(c: String)
    {
        this.border_color = c;
    }

    public reset_border_color()
    {
        this.border_color = this.base_border_color;
    }

    public get_x():number
    {
        return this.node_coords.get_x();
    }

    public get_y():number
    {
        return this.node_coords.get_y();
    }

    public set_x(n: number)
    {
      this.node_coords.set_x(n);
      this.top_center_coords.set_x(this.get_x());
      this.bottom_left_coords.set_x(this.get_x() - (this.radius * 2 / 3));
      this.bottom_right_coords.set_x(this.get_x() + (this.radius * 2 / 3));
    }

    public set_y(n: number)
    {
      this.node_coords.set_y(n);
      this.bottom_left_coords.set_y(this.get_y());
      this.bottom_left_coords.set_y(this.get_y() + (this.radius * 2 / 3));
      this.bottom_right_coords.set_y(this.get_y() + (this.radius * 2 / 3));
    }

    public get_radius():number
    {
        return this.radius;
    }

    public get_color(): String
    {
        return this.border_color;
    }

    public set_displayed(bool: Boolean)
    {
      this.displayed =  bool;
    }

    public get_displayed(): Boolean
    {
      return this.displayed;
    }

    public calculate_height(): number
    {
      if(this.get_left() == null && this.get_right() == null)
			{
				return 1;
			}
			if(this.get_left() != null && this.get_right() == null)
			{
				return this.get_left()!.calculate_height() + 1;
			}
			else if(this.get_right() != null && this.get_left() == null)
			{
				return this.get_right()!.calculate_height() + 1;
			}
			else if(this.get_right()!.calculate_height() > this.get_left()!.calculate_height())
			{
				return this.get_right()!.calculate_height() + 1;
			}
			else
			{
				return this.get_left()!.calculate_height() + 1;
			}
    }

    public calculate_reverse_height(): number
    {
      if(this != null)
      {
        if(this.get_parent() != null)
        {
          return 1 + this.get_parent()!.calculate_reverse_height();
        }
        else
        {
          return 0;
        }
      }
      return 0;
    }

    public recalculate_positions(top_height: number)
    {
      var temp_radius = (this.radius / 2) * Math.pow(2, top_height - 1);

      if(this.get_left() != null)
      {
        this.get_left()!.orgin_coords = new coordinate_pair(this.get_left()!.destination_coords.get_x(), this.get_left()!.destination_coords.get_y());
        this.get_left()!.destination_coords = new coordinate_pair(this.destination_coords.get_x() - temp_radius,this.destination_coords.get_y() + this.get_radius() * 2);
        this.get_left()!.recalculate_positions(top_height - 1);
      }
      if(this.get_right() != null)
      {
        this.get_right()!.orgin_coords = new coordinate_pair(this.get_right()!.destination_coords.get_x(), this.get_right()!.destination_coords.get_y());
        this.get_right()!.destination_coords = new coordinate_pair(this.destination_coords.get_x() + temp_radius,this.destination_coords.get_y() + this.get_radius() * 2);
        this.get_right()!.recalculate_positions(top_height - 1);
      }
    }

    public recalculate_relative_coords()
    {
      this.set_top_center_coords(new coordinate_pair(this.get_x(), this.get_y() - this.radius));
      this.set_bottom_left_coords(new coordinate_pair(this.get_x() - (this.radius * 2 / 3), this.get_y() + (this.radius * 2 / 3)));
      this.set_bottom_right_coords(new coordinate_pair(this.get_x() + (this.radius * 2 / 3), this.get_y() + (this.radius * 2 / 3)));
    }

    public get_balance_factor()
    {
      if(this.get_left() != null && this.get_right() == null)
			{
				return 0 - this.get_left()!.calculate_height();
			}
			else if(this.get_right() != null && this.get_left() == null)
			{
				return this.get_right()?.calculate_height();
			}
			else if(this.get_right() == null && this.get_left() == null)
			{
				return 0;
			}
			
			return this.get_right()!.calculate_height() - this.get_left()!.calculate_height();
    }

    public draw(draw_next: boolean, canvas: CanvasRenderingContext2D, interval: number, clear: boolean)
    {
      if(clear)
      {
        canvas.clearRect(0,0,canvas.canvas.width, canvas.canvas.height);
      }

      if(this.animation_step !== -1)
      {
        this.node_coords.set_x(this.node_coords.get_x() + ((this.destination_coords.get_x() - this.orgin_coords.get_x()) / interval));
        this.node_coords.set_y(this.node_coords.get_y() + ((this.destination_coords.get_y() - this.orgin_coords.get_y()) / interval));
        this.animation_step++;

        // Animation bar
        document.getElementById("animating-bar")?.setAttribute("style", "display: inline");
        document.getElementById("inner-bar")?.setAttribute("style", String("width:" + 100 * (this.animation_step / interval) + "%"));
      }

      if(this.animation_step >= interval)
      {
        this.animation_step = -1;
        this.node_coords = new coordinate_pair(this.destination_coords.get_x(), this.destination_coords.get_y());
        this.orgin_coords = new coordinate_pair(this.destination_coords.get_x(), this.destination_coords.get_y());
        // Animation bar
        document.getElementById("inner-bar")?.setAttribute("style", "width:0%");
        document.getElementById("animating-bar")?.setAttribute("style", "display:none");
      }

      this.recalculate_relative_coords();

      canvas.beginPath();
      canvas.arc(this.get_x(), this.get_y(), this.get_radius(), 0, 2 * Math.PI);
      canvas.strokeStyle = "#" + String(this.get_color());
      canvas.stroke();
      canvas.font = "15px Arial";
      canvas.fillStyle = "white";
      canvas.fillText(String(this.get_value()), this.get_x() - this.radius / 3, this.get_y() - this.radius / 4);

      // Balance Factor
      canvas.font = "10px Arial";
      canvas.fillStyle = "white";
      canvas.fillText("BF: " + String(this.get_balance_factor()), this.get_x() - this.radius * 2/3, this.get_y() + this.radius / 3);

      if(this.get_left() != null)
      {
        canvas.beginPath();
        canvas.moveTo(this.get_bottom_left_coords().get_x(), this.get_bottom_left_coords().get_y());
        canvas.lineTo(this.get_left()?.get_top_center_coords().get_x()!, this.get_left()?.get_top_center_coords().get_y()!);
        canvas.stroke(); 
      }
      if(this.get_right() != null)
      {
        canvas.beginPath();
        canvas.moveTo(this.get_bottom_right_coords().get_x(), this.get_bottom_right_coords().get_y());
        canvas.lineTo(this.get_right()?.get_top_center_coords().get_x()!, this.get_right()?.get_top_center_coords().get_y()!);
        canvas.stroke(); 
      }

      if(draw_next)
      {
        if(this.get_left() != null)
        {
          this.get_left()!.draw(true, canvas, interval, false);
        }
        if(this.get_right() != null)
        {
          this.get_right()!.draw(true, canvas, interval, false);
        }
      }
    }

    public set_lower_steps(node: AVLNode)
    {
      if(node != null)
      {
        node.animation_step = 0;
        this.orgin_coords = new coordinate_pair(this.node_coords.get_x(), this.node_coords.get_y());
        if(this.get_left() != null)
        {
          this.set_lower_steps(node.get_left()!);
        }
        if(this.get_right() != null)
        {
          this.set_lower_steps(node.get_right()!);
        }
      }
    }
}

class AVLTree
{
    head: AVLNode | null;
    canvas_context: CanvasRenderingContext2D;

    constructor(cv: CanvasRenderingContext2D)
    {
        this.head = null;
        this.canvas_context = cv;
    }

    public add(item: number)
    {
        var temp = this.head;
        var last: AVLNode|null;
        last = null;

        if(item == null)
        {
            return this;
        }

        while(temp != null)
        {
          if(last != null)
          {
            last.reset_border_color();
          }

          last = temp;

          if(item < temp.get_value())
          {
            temp = temp.get_left();
          }
          else{
            temp = temp.get_right();
          }
        }

        if(last == null)
        {
          this.head = new AVLNode(item, this.canvas_context.canvas.width/2, 50, first_node_start.radius, first_node_start.color, false, null);
        }
        else if(item < last.get_value())
        {
          last.set_left(new AVLNode(item, this.canvas_context.canvas.width / 2, this.canvas_context.canvas.height - this.head?.radius! * 8, first_node_start.radius, first_node_start.color, false, last));
        }
        else{
          last.set_right(new AVLNode(item, this.canvas_context.canvas.width / 2, this.canvas_context.canvas.height - this.head?.radius! * 8, first_node_start.radius, first_node_start.color, false, last));
        }

        if(this.head != null)
        {
          this.rebalance_tree(this.head);
          this.head.destination_coords.set_x(this.canvas_context.canvas.width / 2);
          this.head.destination_coords.set_y(50);
          this.get_head()?.recalculate_relative_coords();
          this.head.recalculate_positions(this.head.calculate_height());
          this.head.set_lower_steps(this.head);
        }
    }

    public remove(item: number)
    {
      let temp = this.head;
      while(temp != null && temp.get_value() !== item)
      {
        if(item < temp.get_value())
        {
          temp = temp.get_left();
        }
        else if(item > temp.get_value())
        {
          temp = temp.get_right();
        }
        else
        {
          break;
        }
      }

      if(temp != null)
      {
        //Condition One: Leaf node
        if(temp.get_left() == null && temp.get_right() == null)
        {
          if(temp.get_parent()?.get_left() === temp)
          {
            temp.get_parent()?.set_left(null);
          }
          else if(temp === this.head)
          {
            this.set_head(null);
          }
          else
          {
            temp.get_parent()?.set_right(null);
          }
          temp.set_parent(null);
        }
        //Condition Two: One child
        else if(temp.get_left() != null && temp.get_right() == null)
        {
          temp.get_left()!.set_left(temp.get_left()?.get_left()!);
          temp.get_left()!.set_right(temp.get_left()?.get_right()!);
          if(temp.get_parent()?.get_left() === temp)
          {
            temp.get_parent()?.set_left(temp.get_left());
          }
          else if(this.head === temp)
          {
            this.set_head(temp.get_left());
            this.get_head()?.set_parent(null);
          }
          else
          {
            temp.get_parent()?.set_right(temp.get_left());
          }
        }
        else if(temp.get_left() == null && temp.get_right() != null)
        {
          temp.get_right()!.set_left(temp.get_right()?.get_left()!);
          temp.get_right()!.set_right(temp.get_right()?.get_right()!);
          if(temp.get_parent()?.get_left() === temp)
          {
            temp.get_parent()?.set_left(temp.get_right());
          }
          else if(this.head === temp)
          {
            this.set_head(temp.get_right());
            this.get_head()?.set_parent(null);
          }
          else
          {
            temp.get_parent()?.set_right(temp.get_right());
          }
        }
        else
        {
          let temp_inorder_successor:AVLNode|null = temp.get_right();
          let last:AVLNode|null = temp;
          while(temp_inorder_successor!.get_left() != null)
          {
            last = temp_inorder_successor;
            temp_inorder_successor = temp_inorder_successor!.get_left();
          }

          if(this.get_head() !== last)
          {
            last?.set_left(temp_inorder_successor?.get_right()!);
          }

          temp_inorder_successor?.get_parent()?.set_right(null);
          temp_inorder_successor?.set_left(temp.get_left());
          temp_inorder_successor?.set_right(temp.get_right());
          temp_inorder_successor?.set_parent(temp.get_parent());
          temp.get_left()?.set_parent(temp_inorder_successor);
          temp.get_right()?.set_parent(temp_inorder_successor);
          
          if(temp.get_parent()?.get_left() === temp)
          {
            temp.get_parent()?.set_left(temp_inorder_successor);
          }
          else if(temp.get_parent()?.get_right() === temp){
            temp.get_parent()?.set_right(temp_inorder_successor);
          }
          else
          {
            this.set_head(temp_inorder_successor);
          }
        }

        if(this.head != null)
        {
          this.rebalance_tree(this.head);
          this.head.destination_coords.set_x(this.canvas_context.canvas.width / 2);
          this.head.destination_coords.set_y(50);
          this.head.recalculate_positions(this.head.calculate_height());
          this.get_head()?.recalculate_relative_coords();
          this.head.set_lower_steps(this.head);
        }
      }
    }

    public drawTree(node: AVLNode|null, canvas: CanvasRenderingContext2D, interval: number)
    {
      if(node != null)
      {
        node.draw(true, canvas, interval,true);
      }
    }

    public mark_undisplayed(node: AVLNode|null)
    {
      if(node != null)
      {
        node!.set_displayed(false);
        this.mark_undisplayed(node?.get_left()!);
        this.mark_undisplayed(node?.get_right()!);
      }
    }

    public get_head()
    {
      return this.head;
    }

    public set_head(item: AVLNode|null)
    {
      this.head = item;
    }

    public display_inorder(node: AVLNode|null, tree: AVLTree)
    {
      if(node != null)
      {
        this.display_inorder(node?.get_left(), tree);
        console.log(node.get_value());
        this.display_inorder(node?.get_right(), tree);
      }
    }

    public display_preorder(node: AVLNode|null, tree: AVLTree)
    {
      if(node != null)
      {
        console.log(node.get_value());
        this.display_inorder(node?.get_left(), tree);
        this.display_inorder(node?.get_right(), tree);
      }
    }

    public display_postorder(node: AVLNode|null, tree: AVLTree)
    {
      if(node != null)
      {
        this.display_inorder(node?.get_left(), tree);
        this.display_inorder(node?.get_right(), tree);
        console.log(node.get_value());
      }
    }

    public rebalance_tree(current_node: AVLNode|null)
    {
      if(current_node == null)
      {
        return;
      }

      if(current_node.get_left() != null)
      {
        this.rebalance_tree(current_node.get_left()!);
      }
      
      if(current_node.get_right() != null)
      {
        this.rebalance_tree(current_node.get_right()!);
      }
      
      if(current_node.get_balance_factor()! > 1 || current_node.get_balance_factor()! < -1)
      {
        // Right Right Case
        if(current_node.get_balance_factor()! > 0 && current_node.get_right()!.get_balance_factor()! >= 0)
        {
          if(current_node.get_parent() == null)
          {
            this.set_head(this.rotate_left(current_node));
          }
          else if(current_node.get_parent()!.get_left() === current_node)
          {
            current_node.get_parent()!.set_left(this.rotate_left(current_node));
          }
          else
          {
            current_node.get_parent()!.set_right(this.rotate_left(current_node));
          }
        }
        //Left Left Case
        else if(current_node.get_balance_factor()! < 0 && current_node.get_left()!.get_balance_factor()! <= 0)
        {
          if(current_node.get_parent() == null)
          {
            this.set_head(this.rotate_right(current_node));
          }
          else if(current_node.get_parent()!.get_left() === current_node)
          {
            current_node.get_parent()!.set_left(this.rotate_right(current_node));
          }
          else
          {
            current_node.get_parent()!.set_right(this.rotate_right(current_node));
          }
        }
        // Right Left Case
        else if(current_node.get_balance_factor()! > 0 && current_node.get_left()!.get_balance_factor()! < 0)
        {
          if(current_node.get_parent() == null)
          {
            this.set_head(this.rotate_right_left(current_node));
          }
          else if(current_node.get_parent()!.get_left() === current_node)
          {
            current_node.get_parent()!.set_left(this.rotate_right_left(current_node));
          }
          else
          {
            current_node.get_parent()!.set_right(this.rotate_right_left(current_node));
          }
        }
        //Left Right Case
        else if(current_node.get_balance_factor()! < 0 && current_node.get_left()!.get_balance_factor()! > 0)
        {
          if(current_node.get_parent() == null)
          {
            this.set_head(this.rotate_left_right(current_node));
          }
          else if(current_node.get_parent()!.get_left() === current_node)
          {
            current_node.get_parent()!.set_left(this.rotate_left_right(current_node));
          }
          else
          {
            current_node.get_parent()!.set_right(this.rotate_left_right(current_node));
          }
        }
      }
    }

    public rotate_left(X: AVLNode)
    {
      let Z = X.get_right();
      let t23 = Z!.get_left();
      X.set_right(t23);
      if(t23 != null)
      {
        t23.set_parent(X);
      }
      Z!.set_left(X);
      Z!.set_parent(X.get_parent());
      X.set_parent(Z);
      return Z;
    }

    public rotate_right(X: AVLNode)
    {
      let Z = X.get_left();
      let t23 = Z!.get_right();
      X.set_left(t23);
      if(t23 != null)
      {
        t23.set_parent(X);
      }
      Z!.set_right(X);
      Z!.set_parent(X.get_parent());
      X.set_parent(Z);
      return Z;
    }

    public rotate_left_right(X: AVLNode)
    {
      let Z = X.get_left();
      let Y = Z!.get_right();
      
      X.set_left(Y);
      Z!.set_right(Y!.get_left());
      Y!.set_left(Z);
      
      Y!.set_parent(X);
      Z!.set_parent(Y);
      
      if(Z!.get_right() != null)
      {
        Z!.get_right()!.set_parent(Z);
      }
      return this.rotate_right(X);
    }

    public rotate_right_left(X: AVLNode)
    {
      let Z = X.get_right();
      let Y = Z!.get_left();
      
      X.set_right(Y);
      Z!.set_left(Y!.get_right());
      Y!.set_right(Z);
      
      Y!.set_parent(X);
      Z!.set_parent(Y);
      
      if(Z!.get_left() != null)
      {
        Z!.get_left()!.set_parent(Z);
      }
      return this.rotate_left(X);
    }
}

function App() {
  const [add_term, setAddTerm] = useState('');
  const [remove_term, setRemoveTerm] = useState('');
  const [speed_term, setSpeedTerm] = useState('');

  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  const ctx = canvas?.getContext('2d');
  if(ctx != null && defined === false)
  {
    current_tree = new AVLTree(ctx);
    defined = true;
    let interval = setInterval(driver, draw_every_this_long);
  }

  const submitAddForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(current_tree!.head != null && current_tree?.head?.animation_step !== -1)
    {
      alert("Please wait until the animation is finished to add another node!");
    }
    else
    {
      current_tree!.add(Number(add_term));
      current_tree!.canvas_context.clearRect(0,0,current_tree!.canvas_context.canvas.width, current_tree!.canvas_context.canvas.height);
      current_tree!.mark_undisplayed(current_tree?.get_head()!);
      setAddTerm("");
    }
  }

  const submitRemoveForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    current_tree!.remove(Number(remove_term));
    current_tree!.canvas_context.clearRect(0,0,current_tree!.canvas_context.canvas.width, current_tree!.canvas_context.canvas.height)
    current_tree!.mark_undisplayed(current_tree?.get_head()!);
    setRemoveTerm("");
  }

  const submitSpeedForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    steps_per_animation = Number(speed_term) * 1000 / draw_every_this_long;
    document.getElementById("form-container")?.setAttribute("style","display: inline-block");
    setSpeedTerm("");
  }

  return (
    <div className="App">
      <div id="form-container">
        <form onSubmit={submitAddForm} id="form-1">
          <div id="label-1"><label>Add Node:</label></div>
          <input value={add_term} onChange={(e) => setAddTerm(e.target.value)} type="number" placeholder='Enter number to Add' id='add_input'></input>
          <button type="submit">Submit</button>
        </form>
        <form onSubmit={submitRemoveForm}>
        <div id="label-2"><label>Delete Node:</label></div>
          <input value={remove_term} onChange={(e) => setRemoveTerm(e.target.value)} type="number" placeholder='Enter number to Remove'></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div id="form-2">
        <form onSubmit={submitSpeedForm}>
          <div id="label-3"><label>Seconds Per Step:</label></div>
          <input value={speed_term} onChange={(e) => setSpeedTerm(e.target.value)} type="number" placeholder='Enter Speed'></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div id="animating-bar">animating:<div id="outer-bar"><div id="inner-bar"></div></div></div>
    </div>
  );
}

const first_node_start = {radius: 25, color: "FFFFFF"};
let defined = false;
let current_tree: AVLTree|null;
let steps_per_animation: number;
let draw_every_this_long: number = 50;

/* Create canvas with specific height and width to be referenced with later */

let canvas_creation = document.createElement("canvas");
canvas_creation.id = "canvas";
canvas_creation.width = window.innerWidth;
canvas_creation.height = (window.innerHeight * 0.90);
document.body.appendChild(canvas_creation);

function driver()
{
  current_tree!.drawTree(current_tree?.get_head()!,current_tree?.canvas_context!, steps_per_animation);
}

export default App;